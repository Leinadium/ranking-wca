-- metadata
CREATE TABLE IF NOT EXISTS datalake.export_date (
    last_update         DATETIME,
    next_update         DATETIME
);
-----------------------------------------------------

-- competitors
CREATE TABLE IF NOT EXISTS datalake.competitors (
    wca_id              VARCHAR(10) NOT NULL,
    wca_name            VARCHAR(80) NOT NULL
);
-----------------------------------------------------

-- states
CREATE TABLE IF NOT EXISTS datalake.states (
    state_id            CHAR(2),
    state_name          VARCHAR(18)
);
ALTER TABLE datalake.country_states CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
-----------------------------------------------------

-- competitions
CREATE TABLE IF NOT EXISTS datalake.competitions (
    competition_id      VARCHAR(32),
    competition_name    VARCHAR(50),
    state_id            CHAR(2)
)
CREATE INDEX idx_competition_id ON datalake.competitions (competition_id);
CREATE INDEX idx_state_id ON datalake.state_id (state_id)
-----------------------------------------------------

-- competitions by state
CREATE TABLE IF NOT EXISTS datalake.competitions_by_person_and_state (
    wca_id              VARCHAR(10),
    state_id            VARCHAR(18),
    n_competitions      INT
)
ALTER TABLE datalake.competitions_by_person_and_state CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE INDEX idx_wca_id ON datalake.competitions_by_person_and_state (wca_id);
CREATE INDEX idx_state_id ON datalake.competitions_by_person_and_state (state_id);
-----------------------------------------------------


-- estimated state for competitor
CREATE TABLE IF NOT EXISTS datalake.estimated_state_for_user (
    wca_id              VARCHAR(10),
    state_id            CHAR(2),
);
-----------------------------------------------------

-- rankings
CREATE TABLE IF NOT EXISTS datalake.ranking_single (
    wca_id              VARCHAR(10),
    state_id            CHAR(2),
    event_id            VARCHAR(6),
    single              FLOAT,              -- nullable
    ranking             INT
);
-----------------------------------------------------

CREATE TABLE IF NOT EXISTS datalake.ranking_average (
    wca_id              VARCHAR(10),
    state_id            CHAR(2),
    event_id            VARCHAR(6),
    average             FLOAT,              -- nullable
    ranking             INT
);
-----------------------------------------------------