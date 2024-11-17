import { API_ENDPOINTS, API_URL } from "$lib/constants/services";
import HTTPService from "$lib/utils/http";
import type { APIUpdateStatusResponse } from "../../adapters/update/types";
import type { GetUpdateStatusArgs } from "./types";

export const updateService = {
    async getStatus(args?: GetUpdateStatusArgs): Promise<APIUpdateStatusResponse> { //, enqueueSnackbarFn, intl 
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: 'SIGNAL_UPDATE_STATUS',
            url: `${API_URL}${API_ENDPOINTS.UPDATE_STATUS}`,
        })
    }
};