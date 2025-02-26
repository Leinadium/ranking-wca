import type { APIGetLoginUrlResponse, UIGetLoginUrlResponse } from "./types";

export const authAdapter = {
  formatToUI(APIResponse: APIGetLoginUrlResponse): UIGetLoginUrlResponse {
    return {
      ok: APIResponse.ok,
      statusCode: APIResponse.statusCode,
      data: {
        url: APIResponse.data.url,
      },
    };
  }
};