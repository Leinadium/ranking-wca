import type { APIUpdateStatusResponse, UIUpdateStatusResponse } from "./types";

export const updateAdapter = {
  formatToUI(APIResponse: APIUpdateStatusResponse): UIUpdateStatusResponse {
    return {
      ok: APIResponse.ok,
      statusCode: APIResponse.statusCode,
      data: {
        lastUpdatedAt: APIResponse.data.lastUpdate,
      },
    };
  }
};