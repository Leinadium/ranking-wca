package models

import (
	"time"

	"github.com/guregu/null/v5"
)

type PersonResponse struct {
	Name       string                   `json:"name"`
	State      string                   `json:"state"`
	Registered bool                     `json:"registered"`
	Rankings   []PersonRankingsResponse `json:"rankings"`
}

type PersonRankingsResponse struct {
	Event           string      `json:"event"`
	Ranking         int         `json:"ranking"`
	Best            null.Float  `json:"best"`
	CompetitionName string      `json:"compName"`
	Times           [5]null.Int `json:"times"`
}

type PersonQuery struct {
	WcaId      string     `gorm:"column:wca_id"`
	Name       string     `gorm:"column:name"`
	StateId    string     `gorm:"column:state_id"`
	Registered bool       `gorm:"column:registered"`
	EventId    string     `gorm:"column:event_id"`
	Ranking    int        `gorm:"column:ranking"`
	Best       null.Float `gorm:"column:best"`
	CompId     string     `gorm:"column:competition_id"`
	CompName   string     `gorm:"column:competition_name"`
	// Round      int        `gorm:"column:round"`
	Time1 null.Int  `gorm:"column:time_1"`
	Time2 null.Int  `gorm:"column:time_2"`
	Time3 null.Int  `gorm:"column:time_3"`
	Time4 null.Int  `gorm:"column:time_4"`
	Time5 null.Int  `gorm:"column:time_5"`
	Ts    time.Time `gorm:"column:ts"`
}

const QueryPersonSingle = `
SELECT
    dlk.wca_id      AS wca_id,
    ct.wca_name     AS name,
    dlk.state_id    AS state_id,
    CASE WHEN ru.wca_id is not null THEN true ELSE false END AS registered,
    dlk.event_id    AS event_id,
    dlk.ranking     AS ranking,
    dlk.single      AS best,
    comp.id         AS competition_id,
    comp.name       AS competition_name,
    -- dmp.roundTypeId AS round,
    dmp.value1      AS time_1,
    dmp.value2      AS time_2,
    dmp.value3      AS time_3,
    dmp.value4      AS time_4,
    dmp.value5      AS time_5,
    STR_TO_DATE(CONCAT(comp.year, ',', comp.endMonth, ',', comp.endDay), '%Y,%m,%d') AS ts
FROM
    datalake.ranking_single dlk
        LEFT JOIN datalake.competitors ct on dlk.wca_id = ct.wca_id
        LEFT JOIN app.registered_users ru on dlk.wca_id = ru.wca_id
        LEFT JOIN dump.Results dmp on (dlk.wca_id = dmp.personId and dlk.event_id = dmp.eventId)
        LEFT JOIN dump.Competitions comp on (dmp.competitionId = comp.id)
WHERE
    dlk.single = dmp.best
    AND dlk.wca_id = @wcaId
`

const QueryPersonAverage = `
SELECT
    dlk.wca_id      AS wca_id,
    ct.wca_name     AS name,
    dlk.state_id    AS state_id,
    CASE WHEN ru.wca_id is not null THEN true ELSE false END AS registered,
    dlk.event_id    AS event_id,
    dlk.ranking     AS ranking,
    dlk.single      AS best,
    comp.id         AS competition_id,
    comp.name       AS competition_name,
    -- dmp.roundTypeId AS round,
    dmp.value1      AS time_1,
    dmp.value2      AS time_2,
    dmp.value3      AS time_3,
    dmp.value4      AS time_4,
    dmp.value5      AS time_5,
    STR_TO_DATE(CONCAT(comp.year, ',', comp.endMonth, ',', comp.endDay), '%Y,%m,%d') AS ts
FROM
    datalake.ranking_average dlk
        LEFT JOIN datalake.competitors ct on dlk.wca_id = ct.wca_id
        LEFT JOIN app.registered_users ru on dlk.wca_id = ru.wca_id
        LEFT JOIN dump.Results dmp on (dlk.wca_id = dmp.personId and dlk.event_id = dmp.eventId)
        LEFT JOIN dump.Competitions comp on (dmp.competitionId = comp.id)
WHERE
    dlk.single = dmp.best
    AND dlk.wca_id = @wcaId
`

type PersonInfo struct {
	Name              string `gorm:"column:name" json:"name"`
	State             string `gorm:"column:state_id" json:"state"`
	Registered        bool   `gorm:"column:registered" json:"registered"`
	TotalCompetitions int    `gorm:"column:total_competitions" json:"totalCompetitions"`
	StateCompetitions int    `gorm:"column:state_competitions" json:"stateCompetitions"`
}

const QueryPersonInfo = `
SELECT
    ct.wca_name AS name,
    es.state_id AS state_id,
    CASE WHEN ru.wca_id IS NOT NULL THEN true ELSE false END AS registered,
    cb.n_competitions AS state_competitions,
    cb2.total AS total_competitions
FROM
    datalake.competitors ct
        LEFT JOIN app.registered_users ru ON ru.wca_id = ct.wca_id
        LEFT JOIN datalake.estimated_state_for_user es ON es.wca_id = ct.wca_id
        LEFT JOIN datalake.competitions_by_person_and_state cb ON cb.wca_id = ct.wca_id
        LEFT JOIN (
            SELECT personId, COUNT(DISTINCT competitionId) AS total
            FROM dump.Results
            WHERE personId = @wcaId
        ) as cb2 ON cb2.personId = ct.wca_id
WHERE
    es.state_id = cb.state_id
    AND ct.wca_id = @wcaId
`
