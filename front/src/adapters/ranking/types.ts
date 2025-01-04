import type { CustomResponse } from "$lib/utils/http/types";
import type { RankingModel } from "../../models/ranking";
import type { RankingViewModel } from "../../viewModels/ranking/types";

export interface APIRankingResponse extends CustomResponse<RankingModel> {}

export interface UIRankingResponse extends CustomResponse<RankingViewModel> {}