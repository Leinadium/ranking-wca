export const API_URL = 'https://ranking.leinadium.dev/api'

export const API_ENDPOINTS = {
    UPDATE_STATUS: '/status', // GET /status/
    AUTHENTICATE: '/auth/endpoint', // GET /auth/endpoint
    AUTHENTICATE_CALLBACK: '/auth/callback', // GET /auth/callback
    PERSON_INFO: '/person/info', // GET /person/info/<wca_id>
    PERSON_RANKING_BY_MODE: '/person/info', // GET /person/<mode>/<id>
    PERSON_TABLE: '/person/info', // GET /person/table/<id>
    STATE_RANKING: '/person/info', // GET /ranking/<mode>/<event_id>/<state_id>
}