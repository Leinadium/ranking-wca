import { ABORT_SIGNALS_KEYS, API_ENDPOINTS, API_URL } from "$lib/constants/services";
import HTTPService from "$lib/utils/http";
import type { APIPersonInfoResponse, APIPersonImageResponse, APIPersonCurrentRecordsResponse } from "../../adapters/person/types";
import type { GetPersonInfoArgs, GetPersonImageArgs, GetPersonCurrentRecordsArgs } from "./types";

export const personService = {
    async getInfo(args: GetPersonInfoArgs): Promise<APIPersonInfoResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.PERSON_INFO,
            url: `${API_URL}${API_ENDPOINTS.PERSON_INFO}/${args.wcaId}`,
        })
    },

    async getImage(args: GetPersonImageArgs): Promise<APIPersonImageResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.PERSON_IMAGE,
            url: `${API_ENDPOINTS.PERSON_IMAGE}/${args.wcaId}`,
        })
    },

    async getCurrentRecords(args: GetPersonCurrentRecordsArgs): Promise<APIPersonCurrentRecordsResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.PERSON_CURRENT_RECORDS,
            url: `${API_URL}${API_ENDPOINTS.PERSON_CURRENT_RECORDS}/${args.wcaId}`,
        })
    },
};