CREATE TABLE IF NOT EXISTS dump.competitions_by_country (
    wca_id              CHAR(7),
    country_name        VARCHAR(50),
    n_competitions      INT
);

CREATE TABLE IF NOT EXISTS dump.results_by_state (
    wca_id              CHAR(7),
    state_id            CHAR(2),
    event_id            VARCHAR(6),
    average             FLOAT,
    single              FLOAT
);

