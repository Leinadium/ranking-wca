export const API_URL = 'https://ranking.leinadium.dev/api'

export const API_ENDPOINTS = {
    UPDATE_STATUS: '/status',
    AUTHENTICATE: '/auth/endpoint',
    AUTHENTICATE_CALLBACK: '/auth/callback',
    PERSON_INFO: '/person/info',
    PERSON_IMAGE: 'https://www.worldcubeassociation.org/api/v0/persons',
    PERSON_RANKING_BY_MODE: '/person',
    PERSON_CURRENT_RECORDS: '/person/table',
    RANKING: '/ranking',
}

export const ABORT_SIGNALS_KEYS = {
    UPDATE_STATUS: 'SIGNAL_UPDATE_STATUS',
    AUTHENTICATE: 'SIGNAL_AUTHENTICATE',
    AUTHENTICATE_CALLBACK: 'SIGNAL_AUTHENTICATE_CALLBACK',
    PERSON_INFO: 'SIGNAL_PERSON_INFO',
    PERSON_IMAGE: 'SIGNAL_PERSON_IMAGE',
    PERSON_RANKING_BY_MODE: 'SIGNAL_PERSON_RANKING_BY_MODE',
    PERSON_CURRENT_RECORDS: 'SIGNAL_PERSON_CURRENT_RECORDS',
    RANKING: 'SIGNAL_RANKING',
}