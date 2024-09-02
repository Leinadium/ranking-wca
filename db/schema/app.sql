CREATE TABLE IF NOT EXISTS app.states (
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    state_name          VARCHAR(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    PRIMARY KEY (state_id)
);

CREATE TABLE IF NOT EXISTS app.registered_users (
    wca_id              VARCHAR(10) NOT NULL,
    state_id            CHAR(2) NOT NULL CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    register_date       DATETIME NOT NULL,
    PRIMARY KEY (wca_id),
    FOREIGN KEY (state_id) REFERENCES datalake.states(state_id)
)