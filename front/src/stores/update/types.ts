import type { UpdateStatusViewModel } from '../../viewModels/update/types';

export interface UpdateStore extends UpdateStatusViewModel {
	isLoading: boolean;
}
