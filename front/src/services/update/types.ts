import type { SpecificMethodRequestArgs } from "$lib/utils/http/types";

export interface GetUpdateStatusArgs extends Omit<SpecificMethodRequestArgs, 'abortSignalKey' | 'url' | 'body'> {}