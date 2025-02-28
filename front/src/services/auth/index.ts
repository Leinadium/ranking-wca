import { ABORT_SIGNALS_KEYS, API_ENDPOINTS, API_URL } from "$lib/constants/services";
import HTTPService from "$lib/utils/http";
import type { APIGetLoginUrlResponse, APIGetUserInformationsResponse } from "../../adapters/auth/types";
import type { GetLoginUrlArgs, GetUserInformationsArgs } from "./types";

export const authService = {
    async getLoginUrl(args?: GetLoginUrlArgs): Promise<APIGetLoginUrlResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.AUTHENTICATE,
            url: `${API_URL}${API_ENDPOINTS.AUTHENTICATE}`,
        })
    },

    async getUserInformations(args?: GetUserInformationsArgs): Promise<APIGetUserInformationsResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.AUTHENTICATE_CALLBACK,
            url: `${API_URL}${API_ENDPOINTS.AUTHENTICATE_CALLBACK}?code=${args?.code}`,
        })
    },
};