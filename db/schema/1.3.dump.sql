CREATE DATABASE dump;

CREATE TABLE IF NOT EXISTS dump.all_persons_with_states (
    wca_id              VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    PRIMARY KEY (wca_id),
    INDEX (state_id)
);


CREATE TABLE IF NOT EXISTS dump.competitions_by_person_and_country (
    wca_id              VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    country_name        VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    n_competitions      INT,
    PRIMARY KEY (wca_id, country_name),
    FOREIGN KEY (wca_id) REFERENCES datalake.competitors(wca_id) ON DELETE CASCADE,
    INDEX (country_name)
);

CREATE TABLE IF NOT EXISTS dump.results_by_state (
    wca_id              VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    event_id            VARCHAR(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    average             FLOAT,
    single              FLOAT,
    PRIMARY KEY (wca_id, event_id),
    FOREIGN KEY (wca_id) REFERENCES datalake.competitors(wca_id) ON DELETE CASCADE,
    FOREIGN KEY (state_id) REFERENCES app.states(state_id) ON DELETE CASCADE,
    INDEX (average),
    INDEX (single)
);

