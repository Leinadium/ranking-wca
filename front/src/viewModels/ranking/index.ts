import { rankingAdapter } from "../../adapters/ranking";
import type { APIRankingResponse, UIRankingResponse } from "../../adapters/ranking/types";
import { rankingService } from "../../services/ranking";
import type { GetAllRankingArgs } from "../../services/ranking/types";
import { rankingStore } from "../../stores/ranking";

export const loadRanking = async (args: GetAllRankingArgs) => {
  rankingStore.update((state) => ({
    ...state,
    isLoading: true,
  }));

  const APIResponse: APIRankingResponse = await rankingService.getAll(args);
  const adaptedResponse: UIRankingResponse = rankingAdapter.formatToUI(APIResponse);

  rankingStore.update((state) => ({
    ...state,
    items: adaptedResponse.data.items,
    totalItems: adaptedResponse.data.totalItems,
    isLoading: false,
  }));
};
