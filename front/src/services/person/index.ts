import { ABORT_SIGNALS_KEYS, API_ENDPOINTS, API_URL } from "$lib/constants/services";
import HTTPService from "$lib/utils/http";
import type { APIPersonInfoResponse, APIPersonImageResponse, APIPersonCurrentRecordsResponse, APIPersonRankingByModeResponse, APIPeopleBySearchResponse } from "../../adapters/person/types";
import type { GetPersonInfoArgs, GetPersonImageArgs, GetPersonCurrentRecordsArgs, GetPersonRankingByModeArgs, GetPeopleBySearchArgs } from "./types";

export const personService = {
    async getInfo(args: GetPersonInfoArgs): Promise<APIPersonInfoResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.PERSON_INFO,
            url: `${API_URL}${API_ENDPOINTS.PERSON_INFO}/${args.wcaId}`,
            errorMessage: 'Não foi possível carregar dados da pessoa. Por favor, tente novamente.',
        })
    },

    async getImage(args: GetPersonImageArgs): Promise<APIPersonImageResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.PERSON_IMAGE,
            url: `${API_ENDPOINTS.PERSON_IMAGE}/${args.wcaId}`,
            errorMessage: 'Não foi possível carregar imagem da pessoa. Por favor, tente novamente.',
        })
    },

    async getCurrentRecords(args: GetPersonCurrentRecordsArgs): Promise<APIPersonCurrentRecordsResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.PERSON_CURRENT_RECORDS,
            url: `${API_URL}${API_ENDPOINTS.PERSON_CURRENT_RECORDS}/${args.wcaId}`,
            errorMessage: 'Não foi possível carregar dados de recordes atuais da pessoa. Por favor, tente novamente.',
        })
    },

    async getRankingByMode(args: GetPersonRankingByModeArgs): Promise<APIPersonRankingByModeResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.PERSON_RANKING_BY_MODE,
            url: `${API_URL}${API_ENDPOINTS.PERSON_RANKING_BY_MODE}/${args.mode}/${args.wcaId}`,
            errorMessage: 'Não foi possível carregar dados de recordes detalhados da pessoa. Por favor, tente novamente.',
        })
    },

    async getPeopleBySearch(args: GetPeopleBySearchArgs): Promise<APIPeopleBySearchResponse> {
        return await HTTPService.getAsync({
            ...args,
            abortSignalKey: ABORT_SIGNALS_KEYS.PERSON_SEARCH,
            url: `${API_URL}${API_ENDPOINTS.PERSON_SEARCH}?s=${args.term}&p=${args.page ?? 0}&q=${args.itensPerPage ?? 50}`,
            errorMessage: 'Não foi possível buscar a pessoa desejada. Por favor, tente novamente.',
        })
    },
};