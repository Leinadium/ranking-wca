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

// export interface getAsync({ abortSignalKey, url, body, customOnSuccessFn, successMessage, customOnErrorFn, errorMessage, expectedErrorReturn, enqueueSnackbarFn, intl }) {
// try {
//     const response = await this.requestDataAsync({
//     abortSignalKey,
//     method: 'GET',
//     url,
//     body,
//     successMessage,
//     customOnSuccessFn,
//     enqueueSnackbarFn,
//     intl
//     })
//     return response
// }
// catch (error) {
//     const result = this.handleError({
//     error,
//     errorMessage,
//     customOnErrorFn,
//     expectedErrorReturn,
//     enqueueSnackbarFn,
//     intl
//     })

//     return result
// }
// }

// export interface postAsync({ abortSignalKey, url, body, customOnSuccessFn, successMessage, customOnErrorFn, errorMessage, expectedErrorReturn, enqueueSnackbarFn, intl }) {
// try {
//     const response = await this.requestDataAsync({
//     abortSignalKey,
//     method: 'POST',
//     url,
//     body,
//     successMessage,
//     customOnSuccessFn,
//     enqueueSnackbarFn,
//     intl
//     })
//     return response
// }
// catch (error) {
//     const result = this.handleError({
//     error,
//     errorMessage,
//     customOnErrorFn,
//     expectedErrorReturn,
//     enqueueSnackbarFn,
//     intl
//     })

//     return result
// }
// }

// export interface putAsync({ abortSignalKey, url, body, customOnSuccessFn, successMessage, customOnErrorFn, errorMessage, expectedErrorReturn, enqueueSnackbarFn, intl }) {
// try {
//     const response = await this.requestDataAsync({
//     abortSignalKey,
//     method: 'PUT',
//     url,
//     body,
//     successMessage,
//     customOnSuccessFn,
//     enqueueSnackbarFn,
//     intl
//     })
//     return response
// }
// catch (error) {
//     const result = this.handleError({
//     error,
//     errorMessage,
//     customOnErrorFn,
//     expectedErrorReturn,
//     enqueueSnackbarFn,
//     intl
//     })

//     return result
// }
// }

// export interface patchAsync({ abortSignalKey, url, body, customOnSuccessFn, successMessage, customOnErrorFn, errorMessage, expectedErrorReturn, enqueueSnackbarFn, intl }) {
// try {
//     const response = await this.requestDataAsync({
//     abortSignalKey,
//     method: 'PATCH',
//     url,
//     body,
//     successMessage,
//     customOnSuccessFn,
//     enqueueSnackbarFn,
//     intl
//     })
//     return response
// }
// catch (error) {
//     const result = this.handleError({
//     error,
//     errorMessage,
//     customOnErrorFn,
//     expectedErrorReturn,
//     enqueueSnackbarFn,
//     intl
//     })

//     return result
// }
// }

// export interface deleteAsync({ abortSignalKey, url, body, customOnSuccessFn, successMessage, customOnErrorFn, errorMessage, expectedErrorReturn, enqueueSnackbarFn, intl }) {
// try {
//     const response = await this.requestDataAsync({
//     abortSignalKey,
//     method: 'DELETE',
//     url,
//     body,
//     successMessage,
//     customOnSuccessFn,
//     enqueueSnackbarFn,
//     intl
//     })
//     return response
// }
// catch (error) {
//     const result = this.handleError({
//     error,
//     errorMessage,
//     customOnErrorFn,
//     expectedErrorReturn,
//     enqueueSnackbarFn,
//     intl
//     })

//     return result
// }
// }