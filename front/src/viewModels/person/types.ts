export interface PersonInfoViewModel {
	name: string | null;
	stateId: string | null;
	isRegistered: boolean | null;
	totalCompetitionsCount: number | null;
	stateCompetitionsCount: number | null;
}

export interface PersonImageViewModel {
	imageUrl: string | null;
}

export interface PersonCurrentRecordsViewModel {
	eventId: string | null;
	single: number | null;
	average: number | null;
	rankingSingle: number | null;
	rankingAverage: number | null;
}

export interface PersonEventResultViewModel {
	eventId: string;
	ranking: number;
	best: number;
	competitionId: string;
	competitionName: string;
	competitionState: string;
	times: number[];
}

export interface PersonRankingByModeViewModel {
	name: string | null;
	stateId: string | null;
	isRegistered: boolean;
	rankings: PersonEventResultViewModel[];
}

export interface PeopleSearchResultViewModel {
	wcaId: string;
	name: string;
	stateId: string;
}

export interface PeopleSearchViewModel {
	items: PeopleSearchResultViewModel[];
	totalItems: number;
}
