import { updateAdapter } from "../../adapters/update";
import type { APIUpdateStatusResponse, UIUpdateStatusResponse } from "../../adapters/update/types";
import { updateService } from "../../services/update";
import type { GetUpdateStatusArgs } from "../../services/update/types";
import { updateStore } from "../../stores/update";

export const loadUpdateStatus = async (args?: GetUpdateStatusArgs) => {
  updateStore.update((state) => ({
    ...state,
    isLoading: true,
  }));

  const APIResponse: APIUpdateStatusResponse = await updateService.getStatus(args);
  const adaptedResponse: UIUpdateStatusResponse = updateAdapter.formatToUI(APIResponse);

  updateStore.set({
    lastUpdatedAt: adaptedResponse.data?.lastUpdatedAt,
    isLoading: false,
  });
};