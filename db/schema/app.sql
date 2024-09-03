CREATE DATABASE app;

CREATE TABLE IF NOT EXISTS app.states (
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    state_name          VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    PRIMARY KEY (state_id)
);

CREATE TABLE IF NOT EXISTS app.registered_users (
    wca_id              VARCHAR(10) NOT NULL,
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    register_date       DATETIME NOT NULL,
    PRIMARY KEY (wca_id),
    FOREIGN KEY (state_id) REFERENCES app.states(state_id)
);