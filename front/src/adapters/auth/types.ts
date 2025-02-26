import type { CustomResponse } from "$lib/utils/http/types";
import type { LoginUrlModel } from "../../models/auth";
import type { LoginUrlViewModel } from "../../viewModels/auth/types";

export interface APIGetLoginUrlResponse extends CustomResponse<LoginUrlModel> {}

export interface UIGetLoginUrlResponse extends CustomResponse<LoginUrlViewModel> {}