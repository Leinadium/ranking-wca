import { checkIsNullOrUndefined } from "$lib/utils/validation";
import type { APIGetLoginUrlResponse, APIGetUserInformationsResponse, UIGetLoginUrlResponse, UIGetUserInformationsResponse } from "./types";

export const authAdapter = {
  formatLoginUrlToUI(APIResponse: APIGetLoginUrlResponse): UIGetLoginUrlResponse {
    if (checkIsNullOrUndefined(APIResponse.data)) {
      return APIResponse as unknown as UIGetLoginUrlResponse
    }

    return {
      ok: APIResponse.ok,
      statusCode: APIResponse.statusCode,
      data: {
        url: APIResponse.data?.url,
      },
    };
  },

  formatUserInformationsToUI(APIResponse: APIGetUserInformationsResponse): UIGetUserInformationsResponse {
    if (checkIsNullOrUndefined(APIResponse.data)) {
      return APIResponse as unknown as UIGetUserInformationsResponse
    }

    return {
      ok: APIResponse.ok,
      statusCode: APIResponse.statusCode,
      data: {
        accessToken: APIResponse.data?.accessToken,
        expirationTime: APIResponse.data?.expiresIn,
        name: APIResponse.data?.name,
        wcaId: APIResponse.data?.wcaId,
        customRegistration: {
            canRegister: APIResponse.data?.register?.canRegister,
            stateId: APIResponse.data?.register?.stateId,
            updateTimestamp: APIResponse.data?.register?.updated,
        },
      },
    };
  },
};