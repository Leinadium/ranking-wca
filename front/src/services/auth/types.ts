import type { SpecificMethodRequestArgs } from "$lib/utils/http/types";

export interface GetLoginUrlArgs extends Omit<SpecificMethodRequestArgs, 'abortSignalKey' | 'url' | 'body'> {}

export interface GetUserInformationsArgs extends Omit<SpecificMethodRequestArgs, 'abortSignalKey' | 'url' | 'body'> {
    code: string;
}

export interface UpdateUserInformationsArgs extends Omit<SpecificMethodRequestArgs, 'abortSignalKey' | 'url' | 'body'> {
    accessToken: string;
    wcaId: string;
    stateId: string | null;
}