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
    eventId: string  | null;
    single: number  | null;
    average: number  | null;
    rankingSingle: number  | null;
    rankingAverage: number  | null;
}