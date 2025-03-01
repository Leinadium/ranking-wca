import type { CustomResponse } from "$lib/utils/http/types";
import type { LoginUrlModel, UserInformationsModel } from "../../models/auth";
import type { LoginUrlViewModel, UserInformationsViewModel } from "../../viewModels/auth/types";

export interface APIGetLoginUrlResponse extends CustomResponse<LoginUrlModel> {}

export interface UIGetLoginUrlResponse extends CustomResponse<LoginUrlViewModel> {}

export interface APIGetUserInformationsResponse extends CustomResponse<UserInformationsModel> {}

export interface UIGetUserInformationsResponse extends CustomResponse<UserInformationsViewModel> {}

export interface APIUpdateUserInformationsResponse extends CustomResponse<null> {}