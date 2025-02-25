import type { CompetitionModes } from "$lib/types/competitions";
import type { SpecificMethodRequestArgs } from "$lib/utils/http/types";

export interface GetPersonInfoArgs extends Omit<SpecificMethodRequestArgs, 'abortSignalKey' | 'url' | 'body'> {
    wcaId: string;
}

export interface GetPersonImageArgs extends Omit<SpecificMethodRequestArgs, 'abortSignalKey' | 'url' | 'body'> {
    wcaId: string;
}

export interface GetPersonCurrentRecordsArgs extends Omit<SpecificMethodRequestArgs, 'abortSignalKey' | 'url' | 'body'> {
    wcaId: string;
}

export interface GetPersonRankingByModeArgs extends Omit<SpecificMethodRequestArgs, 'abortSignalKey' | 'url' | 'body'> {
    mode: CompetitionModes;
    wcaId: string;
}

export interface GetPeopleBySearchArgs extends Omit<SpecificMethodRequestArgs, 'abortSignalKey' | 'url' | 'body'> {
    term: string; // a partir de 3 caracteres
}