import AbortSignalsManager from "../abortSignals";
import { showErrorMessage, showSuccessMessage } from "../feedback/index"
import { checkIsPlainObject } from "../objects";
import { checkIsNullOrUndefined } from "../validation"
import type { CustomErrorProps, CustomResponse, HandleErrorArgs, RequestDataArgs, SpecificMethodRequestArgs } from "./types";

class CustomError extends Error {
  statusCode

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default class HTTPService {
  static async _getFormattedReponse(response: Response): Promise<any> { // TODO: Melhorar tipagem
    const contentType: string | null = response?.headers?.get('Content-Type')

    switch (true) {
      case contentType?.includes("application/json"):
        return await response?.json()
      case contentType?.includes("text/plain"):
      case contentType?.includes("text/html"):
        return await response?.text()
      case contentType?.includes("application/xml"):
      case contentType?.includes("text/xml"):
        const text = await response?.text()
        return new window.DOMParser().parseFromString(text, "application/xml")
      case contentType?.includes("multipart/form-data"):
        return await response?.formData()
      case contentType?.includes("application/octet-stream"):
      case contentType?.startsWith("image/"):
        return await response?.blob()
      default:
        return await response?.json()
    }
  }

  static async _requestDataAsync<T>(args: RequestDataArgs): Promise<CustomResponse<T>> { //, enqueueSnackbarFn, intl, features
    const encodedURL = encodeURI(args.url)
    const requestOptions = {
      method: args.method,
      ...(args.body && { body: checkIsPlainObject(args.body) ? JSON.stringify(args.body) : args.body }),
      ...(args.abortSignalKey && {signal: AbortSignalsManager.abortAndGetSignal(args.abortSignalKey) }),
    }
    const responsePromise = args.customFetchFn
      ? await args.customFetchFn(encodedURL, requestOptions)
      : await fetch(encodedURL, requestOptions)
    const response = await responsePromise
    const responseData = await this._getFormattedReponse(response)
    const isJSONResponse = response?.headers?.get('Content-Type')?.includes("application/json")
    
    if (!responsePromise?.ok || responsePromise?.status === 404) {
      throw new CustomError(isJSONResponse ? responseData?.error : responseData, responsePromise?.status);
    }

    if (
      args.successMessage
      && responsePromise?.ok
      && responsePromise?.status >= 200 && responsePromise?.status < 300
      // && enqueueSnackbarFn
      // && intl
    ) {
      showSuccessMessage({ friendlyMessage: args.successMessage }) //, enqueueSnackbarFn, intl
    }

    if (args.customOnSuccessFn) args.customOnSuccessFn(responseData)

    return {
      ok: response?.ok,
      statusCode: response?.status,
      data: responseData,
    }
  }

  static _handleError<T>(args: HandleErrorArgs): CustomResponse<T> { //, enqueueSnackbarFn, intl
    const technicalMessage = checkIsNullOrUndefined(args.error?.message)
      ? undefined
      : args.error?.message?.toString()?.replace('Error: ', '')
    const friendlyMessage = args.errorMessage ? `${args.errorMessage} ${technicalMessage}` : undefined

    // if (enqueueSnackbarFn && intl) {
    showErrorMessage({ technicalMessage, friendlyMessage }) //, enqueueSnackbarFn, intl
    // }

    if (args.customOnErrorFn) args.customOnErrorFn()

    return {
      ok: false,
      statusCode: args.error?.statusCode,
      data: args.expectedErrorReturn ?? null,
    }
  }

  static async getAsync<T>(args: SpecificMethodRequestArgs): Promise<CustomResponse<T>> { //, enqueueSnackbareturny {
    try {
      return await this._requestDataAsync({ method: 'GET', ...args })
    } catch (error: CustomErrorProps | unknown) {
      return this._handleError({ error: error as CustomErrorProps, ...args })
    }
  }

  static async postAsync<T>(args: SpecificMethodRequestArgs): Promise<CustomResponse<T>> { //, enqueueSnackbareturny {
    try {
      return await this._requestDataAsync({  method: 'POST', ...args })
    } catch (error: CustomErrorProps | unknown) {
      return this._handleError({ error: error as CustomErrorProps, ...args })
    }
  }

  static async putAsync<T>(args: SpecificMethodRequestArgs): Promise<CustomResponse<T>> { //, enqueueSnackbareturny {
    try {
      return await this._requestDataAsync({ method: 'PUT', ...args })
    } catch (error: CustomErrorProps | unknown) {
      return this._handleError({ error: error as CustomErrorProps, ...args })
    }
  }

  static async patchAsync<T>(args: SpecificMethodRequestArgs): Promise<CustomResponse<T>> { //, enqueueSnackbareturny {
    try {
      return await this._requestDataAsync({ method: 'PATCH', ...args })
    } catch (error: CustomErrorProps | unknown) {
      return this._handleError({ error: error as CustomErrorProps, ...args })
    }
  }

  static async deleteAsync<T>(args: SpecificMethodRequestArgs): Promise<CustomResponse<T>> { //, enqueueSnackbarFn, intl
    try {
      return await this._requestDataAsync({ method: 'DELETE', ...args })
    } catch (error: CustomErrorProps | unknown) {
      return this._handleError({ error: error as CustomErrorProps, ...args })
    }
  }
}