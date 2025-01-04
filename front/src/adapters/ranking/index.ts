import type { RankingResultModel } from "../../models/ranking";
import type { RankingResultViewModel } from "../../viewModels/ranking/types";
import type { APIRankingResponse, UIRankingResponse } from "./types";

// TODO: Desfazer alterações das linhas 12, 13 e 28 quando API estiver correta
export const rankingAdapter = {
  formatToUI(APIResponse: APIRankingResponse): UIRankingResponse {
    return {
      ok: APIResponse.ok,
      statusCode: APIResponse.statusCode,
      data: {
        //@ts-ignore
        items: APIResponse.data.map((recordObject: RankingResultModel): RankingResultViewModel => {
        // items: APIResponse.data.totalItems.map((recordObject: RankingResultModel): RankingResultViewModel => {
          return {
            name: recordObject.name,
            wcaId: recordObject.wcaId,
            stateId: recordObject.stateId,
            best: recordObject.best,
            ranking: recordObject.ranking,
            isRegistered: recordObject.registered,
            competitionId: recordObject.compId,
            competitionName: recordObject.compName,
            competitionState: recordObject.compState,
            times: recordObject.times,
          }
        }),
        totalItems: APIResponse.data.totalItems || 50,
        // totalItems: APIResponse.data.totalItems,
      },
    };
  },
};