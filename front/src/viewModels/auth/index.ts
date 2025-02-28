import { authAdapter } from "../../adapters/auth";
import type { APIGetLoginUrlResponse, APIGetUserInformationsResponse, UIGetLoginUrlResponse, UIGetUserInformationsResponse } from "../../adapters/auth/types";
import { authService } from "../../services/auth";
import type { GetLoginUrlArgs, GetUserInformationsArgs } from "../../services/auth/types";
import { authStore } from "../../stores/auth";
import type { UserInformationsViewModel } from "./types";

export const loadLoginUrl = async (args?: GetLoginUrlArgs): Promise<void> => {
  authStore.update((state) => ({
    ...state,
    isLoading: true,
  }));

  const APIResponse: APIGetLoginUrlResponse = await authService.getLoginUrl(args);
  const adaptedResponse: UIGetLoginUrlResponse = authAdapter.formatLoginUrlToUI(APIResponse);

  authStore.update((state) => ({
    ...state,
    loginUrl: adaptedResponse.data.url,
    isLoading: false,
  }));
};

export const loadUserInformations = async (args?: GetUserInformationsArgs): Promise<UserInformationsViewModel> => {
  authStore.update((state) => ({
    ...state,
    isLoading: true,
  }));

  const APIResponse: APIGetUserInformationsResponse = await authService.getUserInformations(args);
  const adaptedResponse: UIGetUserInformationsResponse = authAdapter.formatUserInformationsToUI(APIResponse);

  authStore.update((state) => ({
    ...state,
    user: adaptedResponse.data,
    isLoading: false,
  }));

  return adaptedResponse.data
};