import { authAdapter } from "../../adapters/auth";
import type { APIGetLoginUrlResponse, UIGetLoginUrlResponse } from "../../adapters/auth/types";
import { authService } from "../../services/auth";
import type { GetLoginUrlArgs } from "../../services/auth/types";
import { authStore } from "../../stores/auth";

export const loadLoginUrl = async (args?: GetLoginUrlArgs) => {
  authStore.update((state) => ({
    ...state,
    isLoading: true,
  }));

  const APIResponse: APIGetLoginUrlResponse = await authService.getLoginUrl(args);
  const adaptedResponse: UIGetLoginUrlResponse = authAdapter.formatToUI(APIResponse);

  authStore.set({
    loginUrl: adaptedResponse.data.url,
    isLoading: false,
  });
};