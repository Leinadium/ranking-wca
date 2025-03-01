import type { RankingResultViewModel } from '../../viewModels/ranking/types';

export interface RankingStore {
	items: RankingResultViewModel[];
	totalItems: number;
	isLoading: boolean;
}
