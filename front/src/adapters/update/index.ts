import { checkIsNullOrUndefined } from '$lib/utils/validation';
import type { APIUpdateStatusResponse, UIUpdateStatusResponse } from './types';

export const updateAdapter = {
	formatToUI(APIResponse: APIUpdateStatusResponse): UIUpdateStatusResponse {
		if (checkIsNullOrUndefined(APIResponse.data)) {
			return APIResponse as unknown as UIUpdateStatusResponse;
		}

		return {
			ok: APIResponse.ok,
			statusCode: APIResponse.statusCode,
			data: {
				lastUpdatedAt: APIResponse.data?.lastUpdate
			}
		};
	}
};
