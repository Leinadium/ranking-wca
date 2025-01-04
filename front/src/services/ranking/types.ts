import type { CompetitionModes } from "$lib/types/competitions";
import type { SpecificMethodRequestArgs } from "$lib/utils/http/types";

export interface GetAllRankingArgs extends Omit<SpecificMethodRequestArgs, 'abortSignalKey' | 'url' | 'body'> {
    mode: CompetitionModes;
    eventId: string;
    stateId: string;
    page: number; // API conta a partir de 0
    itensPerPage?: number;
}