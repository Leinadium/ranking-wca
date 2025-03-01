import { ABORT_SIGNALS_KEYS, API_ENDPOINTS, API_URL } from "$lib/constants/services";
import HTTPService from "$lib/utils/http";
import type { APIGetLoginUrlResponse, APIGetUserInformationsResponse, APIUpdateUserInformationsResponse } from "../../adapters/auth/types";
import type { GetLoginUrlArgs, GetUserInformationsArgs, UpdateUserInformationsArgs } from "./types";

export const authService = {
    async getLoginUrl(args?: GetLoginUrlArgs): Promise<APIGetLoginUrlResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.AUTH,
            url: `${API_URL}${API_ENDPOINTS.AUTH}`,
        })
    },

    async getUserInformations(args?: GetUserInformationsArgs): Promise<APIGetUserInformationsResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.AUTH_CALLBACK,
            url: `${API_URL}${API_ENDPOINTS.AUTH_CALLBACK}?code=${args?.code}`,
        })
    },

    async updateUserInformations(args?: UpdateUserInformationsArgs): Promise<APIUpdateUserInformationsResponse> {
        return await HTTPService.postAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.USER_UPDATE,
            url: `${API_URL}${API_ENDPOINTS.USER_UPDATE}`,
            body: {
                accessToken: args?.accessToken,
                wcaId: args?.wcaId,
                stateId: args?.stateId,
            }
        })
    },
};