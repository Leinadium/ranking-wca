import type { CustomResponse } from '$lib/utils/http/types';
import type { UpdateStatusModel } from '../../models/update';
import type { UpdateStatusViewModel } from '../../viewModels/update/types';

export interface APIUpdateStatusResponse extends CustomResponse<UpdateStatusModel> {}

export interface UIUpdateStatusResponse extends CustomResponse<UpdateStatusViewModel> {}
