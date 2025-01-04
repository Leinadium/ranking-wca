import { ABORT_SIGNALS_KEYS, API_ENDPOINTS, API_URL } from "$lib/constants/services";
import HTTPService from "$lib/utils/http";
import type { APIRankingResponse } from "../../adapters/ranking/types";
import type { GetAllRankingArgs } from "./types";

export const rankingService = {
    async getAll(args: GetAllRankingArgs): Promise<APIRankingResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.RANKING,
            url: `${API_URL}${API_ENDPOINTS.RANKING}/${args.mode}/${args.eventId}/${args.stateId}?p=${args.page ?? 0}&q=${args.itensPerPage ?? 50}`,
        })
    },
};