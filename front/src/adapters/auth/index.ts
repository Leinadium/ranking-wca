import type { APIGetLoginUrlResponse, APIGetUserInformationsResponse, UIGetLoginUrlResponse, UIGetUserInformationsResponse } from "./types";

export const authAdapter = {
  formatLoginUrlToUI(APIResponse: APIGetLoginUrlResponse): UIGetLoginUrlResponse {
    return {
      ok: APIResponse.ok,
      statusCode: APIResponse.statusCode,
      data: {
        url: APIResponse.data.url,
      },
    };
  },

  formatUserInformationsToUI(APIResponse: APIGetUserInformationsResponse): UIGetUserInformationsResponse {
    return {
      ok: APIResponse.ok,
      statusCode: APIResponse.statusCode,
      data: {
        accessToken: APIResponse.data.accessToken,
        expirationTime: APIResponse.data.expiresIn,
        name: APIResponse.data.name,
        wcaId: APIResponse.data.wcaId,
        customRegistration: {
            canRegister: APIResponse.data.register.canRegister,
            stateId: APIResponse.data.register.stateId,
            updateTimestamp: APIResponse.data.register.updated,
        },
      },
    };
  },
};