export interface PersonInfoModel {
    name: string;
    state: string;
    registered: boolean;
    totalCompetitions: number;
    stateCompetitions: number;
}

export interface PersonImageModel {
    person: {
        avatar: {
            url: string;
        }
    }
}

export interface PersonCurrentRecordsModel {
    event: string;
    single: number;
    average: number;
    rankingSingle: number;
    rankingAverage: number;
}

export interface PersonEventResultModel {
    event: string;
    ranking: number;
    best: number;
    compId: string;
    compName: string;
    compState: string;
    times: number[];
}

export interface PersonRankingByModeModel {
    name: string;
    state: string;
    registered: boolean;
    rankings: PersonEventResultModel[],
}

export interface PeopleSearchResultModel {
    wcaId: string;
    wcaName: string;
    stateId: string;
}

// TODO: Implementar totalItems quando busca estiver paginada pelo Back-end
export interface PeopleSearchModel {
    results: PeopleSearchResultModel[];
    // totalItems: number;
}