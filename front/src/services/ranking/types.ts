import type { CompetitionModes } from "$lib/types/competitions";
import type { PaginatedQuery } from "$lib/types/pagination";
import type { SpecificMethodRequestArgs } from "$lib/utils/http/types";

export interface GetAllRankingArgs extends Omit<SpecificMethodRequestArgs, 'abortSignalKey' | 'url' | 'body'>, PaginatedQuery {
    mode: CompetitionModes;
    eventId: string;
    stateId: string;
}