CREATE database app; 

CREATE TABLE IF NOT EXISTS app.states (
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    state_name          VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    PRIMARY KEY (state_id)
);

CREATE TABLE IF NOT EXISTS app.registered_users (
    wca_id              VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    register_date       DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (wca_id),
    FOREIGN KEY (state_id) REFERENCES app.states(state_id) ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS app.next_update_users (
--     wca_id              VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
--     state_id            CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
--     PRIMARY KEY (wca_id),
--     FOREIGN KEY (state_id) REFERENCES app.states(state_id) ON DELETE CASCADE
-- )