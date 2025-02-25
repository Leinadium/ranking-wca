type requestMethodOptions = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';

export interface RequestDataArgs {
    abortSignalKey: string;
    method: requestMethodOptions;
    url: string;
    body?: any; // TODO: Melhorar tipagem
    successMessage?: string;
    customOnSuccessFn?: (responseData: any) => void; // TODO: Melhorar tipagem
    customFetchFn?: Function;
}

export interface CustomResponse<T> {
    ok: boolean;
    statusCode: number;
    data: T;
}

export interface CustomErrorProps {
    statusCode: number;
    message?: string;
    options?: ErrorOptions;
}

export interface HandleErrorArgs {
    error: CustomErrorProps;
    errorMessage?: string;
    customOnErrorFn?: () => void; // TODO: Melhorar tipagem
    expectedErrorReturn?: any;
}

export interface SpecificMethodRequestArgs extends Omit<RequestDataArgs, 'method'>, Omit<HandleErrorArgs, 'error'> {}