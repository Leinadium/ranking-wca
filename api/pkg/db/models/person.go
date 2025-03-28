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
	Event            string      `json:"event"`
	Ranking          int         `json:"ranking"`
	Best             null.Int    `json:"best"`
	CompetitionId    string      `json:"compId"`
	CompetitionName  string      `json:"compName"`
	CompetitionState null.String `json:"compState"`
	Times            [5]null.Int `json:"times"`
}

type PersonQuery struct {
	WcaId      string   `gorm:"column:wca_id"`
	Name       string   `gorm:"column:name"`
	StateId    string   `gorm:"column:state_id"`
	Registered bool     `gorm:"column:registered"`
	EventId    string   `gorm:"column:event_id"`
	Ranking    int      `gorm:"column:ranking"`
	Best       null.Int `gorm:"column:best"`
	CompId     string   `gorm:"column:competition_id"`
	CompName   string   `gorm:"column:competition_name"`
	CompState  string   `gorm:"column:competition_state"`
	// Round      int        `gorm:"column:round"`
	Time1 null.Int  `gorm:"column:time_1"`
	Time2 null.Int  `gorm:"column:time_2"`
	Time3 null.Int  `gorm:"column:time_3"`
	Time4 null.Int  `gorm:"column:time_4"`
	Time5 null.Int  `gorm:"column:time_5"`
	Ts    time.Time `gorm:"column:ts"`
}

func (p PersonQuery) GetTS() time.Time {
	return p.Ts
}

func (p PersonQuery) GetKey() string {
	return p.EventId
}

const QueryPersonSingle = `
SELECT
    dlk.wca_id      AS wca_id,
    ct.wca_name     AS name,
    al.state_id     AS state_id,
    CASE WHEN ru.wca_id is not null THEN true ELSE false END AS registered,
    dlk.event_id    AS event_id,
    dlk.ranking     AS ranking,
    dlk.single      AS best,
    comp.id         AS competition_id,
    comp.name       AS competition_name,
    comp2.state_id  AS competition_state,
    -- dmp.roundTypeId AS round,
    dmp.value1      AS time_1,
    dmp.value2      AS time_2,
    dmp.value3      AS time_3,
    dmp.value4      AS time_4,
    dmp.value5      AS time_5,
    STR_TO_DATE(CONCAT(comp.year, ',', comp.endMonth, ',', comp.endDay), '%Y,%m,%d') AS ts
FROM
    datalake.ranking_single dlk
        LEFT JOIN datalake.competitors ct on (dlk.wca_id = ct.wca_id)
        LEFT JOIN datalake.all_persons_with_states al on (dlk.wca_id = al.wca_id)
        LEFT JOIN app.registered_users ru on (dlk.wca_id = ru.wca_id)
        LEFT JOIN dump.Results dmp on (dlk.wca_id = dmp.personId and dlk.event_id = dmp.eventId)
        LEFT JOIN dump.Competitions comp on (dmp.competitionId = comp.id)
        LEFT JOIN datalake.competitions comp2 on (dmp.competitionId = comp2.competition_id)
WHERE
    dlk.single = dmp.best
    AND dlk.wca_id = @wcaId
`

const QueryPersonAverage = `
SELECT
    dlk.wca_id      AS wca_id,
    ct.wca_name     AS name,
    al.state_id     AS state_id,
    CASE WHEN ru.wca_id is not null THEN true ELSE false END AS registered,
    dlk.event_id    AS event_id,
    dlk.ranking     AS ranking,
    dlk.average     AS best,
    comp.id         AS competition_id,
    comp.name       AS competition_name,
    comp2.state_id  AS competition_state,
    -- dmp.roundTypeId AS round,
    dmp.value1      AS time_1,
    dmp.value2      AS time_2,
    dmp.value3      AS time_3,
    dmp.value4      AS time_4,
    dmp.value5      AS time_5,
    STR_TO_DATE(CONCAT(comp.year, ',', comp.endMonth, ',', comp.endDay), '%Y,%m,%d') AS ts
FROM
    datalake.ranking_average dlk
        LEFT JOIN datalake.competitors ct on (dlk.wca_id = ct.wca_id)
        LEFT JOIN datalake.all_persons_with_states al on (dlk.wca_id = al.wca_id)
        LEFT JOIN app.registered_users ru on (dlk.wca_id = ru.wca_id)
        LEFT JOIN dump.Results dmp on (dlk.wca_id = dmp.personId and dlk.event_id = dmp.eventId)
        LEFT JOIN dump.Competitions comp on (dmp.competitionId = comp.id)
        LEFT JOIN datalake.competitions comp2 on (dmp.competitionId = comp2.competition_id)
WHERE
    dlk.average = dmp.average
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
    al.state_id AS state_id,
    CASE WHEN ru.wca_id IS NOT NULL THEN true ELSE false END AS registered,
    cb.n_competitions AS state_competitions,
    cb2.total AS total_competitions
FROM
    datalake.competitors ct
        LEFT JOIN app.registered_users ru ON ru.wca_id = ct.wca_id
        LEFT JOIN datalake.all_persons_with_states al on ct.wca_id = al.wca_id
        LEFT JOIN datalake.competitions_by_person_and_state cb ON cb.wca_id = ct.wca_id
        LEFT JOIN (
            SELECT personId, COUNT(DISTINCT competitionId) AS total
            FROM dump.Results
            WHERE personId = @wcaId
        ) as cb2 ON cb2.personId = ct.wca_id
WHERE
    ct.wca_id = @wcaId
`

type TablePerson struct {
	Event          string   `gorm:"column:event" json:"event"`
	Single         null.Int `gorm:"column:single" json:"single"`
	Average        null.Int `gorm:"column:average" json:"average"`
	RankingSingle  int      `gorm:"column:ranking_single" json:"rankingSingle"`
	RankingAverage int      `gorm:"column:ranking_average" json:"rankingAverage"`
}

const QueryTablePerson = `
SELECT
    rs.event_id AS event,
    rs.single   AS single,
    rs.ranking  AS ranking_single,
    ra.average  AS average,
    ra.ranking  AS ranking_average
FROM
    datalake.ranking_single rs
        JOIN datalake.ranking_average ra
            ON rs.wca_id = ra.wca_id
            AND rs.state_id = ra.state_id
            AND rs.event_id = ra.event_id
WHERE
    rs.wca_id = @wcaId
`
