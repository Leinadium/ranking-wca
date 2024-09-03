CREATE DATABASE dump;

CREATE TABLE IF NOT EXISTS dump.all_persons_with_states (
    wca_id              VARCHAR(10) NOT NULL,
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    PRIMARY KEY (wca_id),
    INDEX (state_id)
);


CREATE TABLE IF NOT EXISTS dump.competitions_by_person_and_country (
    wca_id              VARCHAR(10) NOT NULL,
    country_name        VARCHAR(50) NOT NULL,
    n_competitions      INT,
    PRIMARY KEY (wca_id, country_name),
    FOREIGN KEY (wca_id) REFERENCES datalake.competitors(wca_id),
    INDEX (country_name)
);

CREATE TABLE IF NOT EXISTS dump.results_by_state (
    wca_id              VARCHAR(10) NOT NULL,
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    event_id            VARCHAR(6) NOT NULL,
    average             FLOAT,
    single              FLOAT,
    PRIMARY KEY (wca_id, event_id),
    FOREIGN KEY (wca_id) REFERENCES datalake.competitors(wca_id),
    FOREIGN KEY (state_id) REFERENCES app.states(state_id),
    INDEX (average),
    INDEX (single)
);

