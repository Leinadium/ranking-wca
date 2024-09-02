-- metadata
CREATE TABLE IF NOT EXISTS datalake.export_date (
    last_update         DATETIME,
    next_update         DATETIME,
    PRIMARY KEY (last_update, next_update)
);
-----------------------------------------------------

-- competitors
CREATE TABLE IF NOT EXISTS datalake.competitors (
    wca_id              VARCHAR(10) NOT NULL,
    wca_name            VARCHAR(80) NOT NULL,
    PRIMARY KEY (wca_id)
);
-----------------------------------------------------

-- competitions
CREATE TABLE IF NOT EXISTS datalake.competitions (
    competition_id      VARCHAR(32) NOT NULL,
    competition_name    VARCHAR(50) NOT NULL,
    state_id            CHAR(2) NOT NULL CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    PRIMARY KEY (competition_id),
    FOREIGN KEY (state_id) REFERENCES app.states(state_id)
);
-----------------------------------------------------

-- competitions by state
CREATE TABLE IF NOT EXISTS datalake.competitions_by_person_and_state (
    wca_id              VARCHAR(10) NOT NULL,
    state_id            CHAR(2) NOT NULL CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    n_competitions      INT NOT NULL,
    PRIMARY KEY (wca_id, state_id),
    FOREIGN KEY (state_id) REFERENCES app.states(state_id)
);
-----------------------------------------------------

-- estimated state for competitor
CREATE TABLE IF NOT EXISTS datalake.estimated_state_for_user (
    wca_id              VARCHAR(10) NOT NULL,
    state_id            CHAR(2) NOT NULL CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    PRIMARY KEY (wca_id),
    FOREIGN KEY (wca_id) REFERENCES datalake.competitors(wca_id),
    FOREIGN KEY (state_id) REFERENCES app.states(state_id)
);
-----------------------------------------------------

-- rankings
CREATE TABLE IF NOT EXISTS datalake.ranking_single (
    wca_id              VARCHAR(10) NOT NULL,
    state_id            CHAR(2) NOT NULL CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    event_id            VARCHAR(6) NOT NULL,
    single              FLOAT,
    ranking             INT NOT NULL,
    PRIMARY KEY (wca_id, event_id),
    FOREIGN KEY (wca_id) REFERENCES datalake.competitors(wca_id),
    FOREIGN KEY (state_id) REFERENCES app.states(state_id),
    INDEX (ranking)
);

CREATE TABLE IF NOT EXISTS datalake.ranking_average (
    wca_id              VARCHAR(10),
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    event_id            VARCHAR(6),
    average             FLOAT,
    ranking             INT NOT NULL,
    PRIMARY KEY (wca_id, event_id),
    FOREIGN KEY (wca_id) REFERENCES datalake.competitors(wca_id),
    FOREIGN KEY (state_id) REFERENCES app.states(state_id),
    INDEX (ranking)
);
-----------------------------------------------------