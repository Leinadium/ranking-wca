CREATE DATABASE datalake;

-- metadata
CREATE TABLE IF NOT EXISTS datalake.export_date (
    last_update         DATETIME,
    next_update         DATETIME,
    PRIMARY KEY (last_update, next_update)
);
-----------------------------------------------------

-- ALTER TABLE datalake.competitors CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- competitors
CREATE TABLE IF NOT EXISTS datalake.competitors (
    wca_id              VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    wca_name            VARCHAR(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    PRIMARY KEY (wca_id)
);
-----------------------------------------------------

-- competitions
CREATE TABLE IF NOT EXISTS datalake.competitions (
    competition_id      VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    PRIMARY KEY (competition_id),
    FOREIGN KEY (state_id) REFERENCES app.states(state_id) ON DELETE CASCADE
);
-----------------------------------------------------

-- competitions by state
CREATE TABLE IF NOT EXISTS datalake.competitions_by_person_and_state (
    wca_id              VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    n_competitions      INT NOT NULL,
    PRIMARY KEY (wca_id, state_id),
    FOREIGN KEY (state_id) REFERENCES app.states(state_id) ON DELETE CASCADE
);
-----------------------------------------------------

-- estimated state for competitor
CREATE TABLE IF NOT EXISTS datalake.estimated_state_for_user (
    wca_id              VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    PRIMARY KEY (wca_id),
    FOREIGN KEY (wca_id) REFERENCES datalake.competitors(wca_id) ON DELETE CASCADE,
    FOREIGN KEY (state_id) REFERENCES app.states(state_id) ON DELETE CASCADE
);
-----------------------------------------------------

-- rankings
CREATE TABLE IF NOT EXISTS datalake.ranking_single (
    wca_id              VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    event_id            VARCHAR(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    single              FLOAT,
    ranking             INT NOT NULL,
    PRIMARY KEY (wca_id, event_id),
    FOREIGN KEY (wca_id) REFERENCES datalake.competitors(wca_id) ON DELETE CASCADE,
    FOREIGN KEY (state_id) REFERENCES app.states(state_id) ON DELETE CASCADE,
    INDEX (ranking)
);

CREATE TABLE IF NOT EXISTS datalake.ranking_average (
    wca_id              VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    event_id            VARCHAR(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    average             FLOAT,
    ranking             INT NOT NULL,
    PRIMARY KEY (wca_id, event_id),
    FOREIGN KEY (wca_id) REFERENCES datalake.competitors(wca_id) ON DELETE CASCADE,
    FOREIGN KEY (state_id) REFERENCES app.states(state_id) ON DELETE CASCADE,
    INDEX (ranking)
);

CREATE TABLE IF NOT EXISTS datalake.sum_of_ranks (
    wca_id              VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    sum_single          INT,
    sum_average         INT,
    sum_sum             INT,
    PRIMARY KEY (wca_id),
    FOREIGN KEY (wca_id) REFERENCES datalake.competitors(wca_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS datalake.ranking_sum (
    wca_id              VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    ranking_single      INT NOT NULL,
    ranking_average     INT NOT NULL,
    PRIMARY KEY (wca_id),
    FOREIGN KEY (wca_id) REFERENCES datalake.competitors(wca_id) ON DELETE CASCADE,
    FOREIGN KEY (state_id) REFERENCES app.states(state_id) ON DELETE CASCADE,
    INDEX (ranking_single),
    INDEX (ranking_average)
);
-----------------------------------------------------