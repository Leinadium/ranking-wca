export interface RankingResultViewModel {
	name: string | null;
	wcaId: string | null;
	stateId: string | null;
	best: number | null;
	ranking: number | null;
	isRegistered: boolean;
	competitionId: string | null;
	competitionName: string | null;
	competitionState: string | null;
	times: number[];
}

export interface RankingViewModel {
	items: RankingResultViewModel[];
	totalItems: number;
}
