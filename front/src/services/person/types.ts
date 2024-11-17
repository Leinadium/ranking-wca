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