export const API_URL = 'https://ranking.leinadium.dev/api'

export const API_ENDPOINTS = {
    UPDATE_STATUS: '/status',
    AUTH: '/auth/endpoint',
    AUTH_CALLBACK: '/auth/callback',
    USER_UPDATE: '/auth/register',
    PERSON_INFO: '/person/info',
    PERSON_IMAGE: 'https://www.worldcubeassociation.org/api/v0/persons',
    PERSON_RANKING_BY_MODE: '/person',
    PERSON_CURRENT_RECORDS: '/person/table',
    PERSON_SEARCH: '/search',
    RANKING: '/ranking',
}

export const ABORT_SIGNALS_KEYS = {
    UPDATE_STATUS: 'SIGNAL_UPDATE_STATUS',
    AUTH: 'SIGNAL_AUTH',
    AUTH_CALLBACK: 'SIGNAL_AUTH_CALLBACK',
    USER_UPDATE: 'SIGNAL_USER_UPDATE',
    PERSON_INFO: 'SIGNAL_PERSON_INFO',
    PERSON_IMAGE: 'SIGNAL_PERSON_IMAGE',
    PERSON_RANKING_BY_MODE: 'SIGNAL_PERSON_RANKING_BY_MODE',
    PERSON_CURRENT_RECORDS: 'SIGNAL_PERSON_CURRENT_RECORDS',
    PERSON_SEARCH: 'SIGNAL_PERSON_SEARCH',
    RANKING: 'SIGNAL_RANKING',
}