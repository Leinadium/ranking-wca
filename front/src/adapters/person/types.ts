import type { CustomResponse } from '$lib/utils/http/types';
import type {
	PersonCurrentRecordsModel,
	PersonImageModel,
	PersonInfoModel,
	PersonRankingByModeModel,
	PeopleSearchModel
} from '../../models/person';
import type {
	PersonCurrentRecordsViewModel,
	PersonImageViewModel,
	PersonInfoViewModel,
	PersonRankingByModeViewModel,
	PeopleSearchViewModel
} from '../../viewModels/person/types';

export interface APIPersonInfoResponse extends CustomResponse<PersonInfoModel> {}

export interface UIPersonInfoResponse extends CustomResponse<PersonInfoViewModel> {}

export interface APIPersonImageResponse extends CustomResponse<PersonImageModel> {}

export interface UIPersonImageResponse extends CustomResponse<PersonImageViewModel> {}

export interface APIPersonCurrentRecordsResponse
	extends CustomResponse<PersonCurrentRecordsModel[]> {}

export interface UIPersonCurrentRecordsResponse
	extends CustomResponse<PersonCurrentRecordsViewModel[]> {}

export interface APIPersonRankingByModeResponse extends CustomResponse<PersonRankingByModeModel> {}

export interface UIPersonRankingByModeResponse
	extends CustomResponse<PersonRankingByModeViewModel> {}

export interface APIPeopleBySearchResponse extends CustomResponse<PeopleSearchModel> {}

export interface UIPeopleBySearchResponse extends CustomResponse<PeopleSearchViewModel> {}
