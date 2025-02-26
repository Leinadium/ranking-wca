import { ABORT_SIGNALS_KEYS, API_ENDPOINTS, API_URL } from "$lib/constants/services";
import HTTPService from "$lib/utils/http";
import type { APIGetLoginUrlResponse } from "../../adapters/auth/types";
import type { GetLoginUrlArgs } from "./types";

export const authService = {
    async getLoginUrl(args?: GetLoginUrlArgs): Promise<APIGetLoginUrlResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.AUTHENTICATE,
            url: `${API_URL}${API_ENDPOINTS.AUTHENTICATE }`,
        })
    }
};