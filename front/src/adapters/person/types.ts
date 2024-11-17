import type { CustomResponse } from "$lib/utils/http/types";
import type { PersonCurrentRecordsModel, PersonImageModel, PersonInfoModel } from "../../models/person";
import type { PersonCurrentRecordsViewModel, PersonImageViewModel, PersonInfoViewModel } from "../../viewModels/person/types";

export interface APIPersonInfoResponse extends CustomResponse<PersonInfoModel> {}

export interface UIPersonInfoResponse extends CustomResponse<PersonInfoViewModel> {}

export interface APIPersonImageResponse extends CustomResponse<PersonImageModel> {}

export interface UIPersonImageResponse extends CustomResponse<PersonImageViewModel> {}

export interface APIPersonCurrentRecordsResponse extends CustomResponse<PersonCurrentRecordsModel[]> {}

export interface UIPersonCurrentRecordsResponse extends CustomResponse<PersonCurrentRecordsViewModel[]> {}