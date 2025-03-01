import { checkIsNullOrUndefined } from '$lib/utils/validation';
import type { RankingResultModel } from '../../models/ranking';
import type { RankingResultViewModel } from '../../viewModels/ranking/types';
import type { APIRankingResponse, UIRankingResponse } from './types';

// TODO: Desfazer alterações das linhas 12, 13 e 28 quando API estiver correta
export const rankingAdapter = {
	formatToUI(APIResponse: APIRankingResponse): UIRankingResponse {
		if (checkIsNullOrUndefined(APIResponse.data)) {
			return APIResponse as unknown as UIRankingResponse;
		}

		return {
			ok: APIResponse.ok,
			statusCode: APIResponse.statusCode,
			data: {
				items:
					APIResponse.data?.results?.map(
						(recordObject: RankingResultModel): RankingResultViewModel => {
							return {
								name: recordObject?.name,
								wcaId: recordObject?.wcaId,
								stateId: recordObject?.stateId,
								best: recordObject?.best,
								ranking: recordObject?.ranking,
								isRegistered: recordObject?.registered,
								competitionId: recordObject?.compId,
								competitionName: recordObject?.compName,
								competitionState: recordObject?.compState,
								times: recordObject?.times
							};
						}
					) || [],
				totalItems: APIResponse.data?.totalItems ?? 50
			}
		};
	}
};
