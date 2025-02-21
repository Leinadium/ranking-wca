export interface RankingResultModel {
    name: string;
    wcaId: string;
    stateId: string;
    best: number;
    ranking: number;
    registered: boolean;
    compId: string;
    compName: string;
    compState: string;
    times: number[];
}

export interface RankingModel {
    results: RankingResultModel[],
    totalItems: number;
}