package models

import (
	"time"

	"github.com/guregu/null/v5"
)

type PersonRankingResponse struct {
	Event           string      `json:"event"`
	Ranking         int         `json:"ranking"`
	Best            null.Float  `json:"best"`
	CompetitionName string      `json:"compName"`
	Times           [5]null.Int `json:"times"`
}

type PersonResponse struct {
	Name       string                  `json:"name"`
	State      string                  `json:"state"`
	Registered bool                    `json:"registered"`
	Rankings   []PersonRankingResponse `json:"rankings"`
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

const QUERY_PERSON = `
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
