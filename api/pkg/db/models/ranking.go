package models

import (
	"time"

	"github.com/guregu/null/v5"
)

type RankingResponse struct {
	Name       string      `json:"name"`
	WCAid      string      `json:"wcaId"`
	State      string      `json:"stateId"`
	Best       null.Int    `json:"best"`
	Ranking    int         `json:"ranking"`
	Registered bool        `json:"registered"`
	CompId     string      `json:"compId"`
	CompName   string      `json:"compName"`
	CompState  null.String `json:"compState"`
	Times      [5]null.Int `json:"times"`
}

type RankingQuery struct {
	WCAid      string      `gorm:"column:wca_id"`
	Name       string      `gorm:"column:name"`
	State      string      `gorm:"column:state_id"`
	Best       null.Int    `gorm:"column:best"`
	Ranking    int         `gorm:"column:ranking"`
	Registered bool        `gorm:"column:registered"`
	CompId     string      `gorm:"column:competition_id"`
	CompName   string      `gorm:"column:competition_name"`
	CompState  null.String `gorm:"column:competition_state"`
	Time1      null.Int    `gorm:"column:time_1"`
	Time2      null.Int    `gorm:"column:time_2"`
	Time3      null.Int    `gorm:"column:time_3"`
	Time4      null.Int    `gorm:"column:time_4"`
	Time5      null.Int    `gorm:"column:time_5"`
	Ts         time.Time   `gorm:"column:ts"`
}

func (r RankingQuery) GetTS() time.Time {
	return r.Ts
}

func (r RankingQuery) GetKey() string {
	return r.WCAid
}

const QueryRankingSingle = `
SELECT
	rs.wca_id 			AS wca_id,
	cpr.wca_name 		AS name,
	rs.state_id 		AS state_id,
	CASE WHEN ru.wca_id is not null THEN true ELSE false END AS registered,
	rs.event_id 		AS event_id,
	rs.ranking 			AS ranking,
	rs.single 			AS best,
	comp.id         	AS competition_id,
    comp.name       	AS competition_name,
    cpn.state_id  		AS competition_state,
    dmp.value1      	AS time_1,
    dmp.value2      	AS time_2,
    dmp.value3      	AS time_3,
    dmp.value4      	AS time_4,
    dmp.value5      	AS time_5,
    STR_TO_DATE(CONCAT(comp.year, ',', comp.endMonth, ',', comp.endDay), '%Y,%m,%d') AS ts
FROM
	datalake.ranking_single rs
		LEFT JOIN datalake.competitors cpr on rs.wca_id = cpr.wca_id
		LEFT JOIN app.registered_users ru on rs.wca_id = ru.wca_id
		LEFT JOIN dump.Results dmp on (rs.wca_id = dmp.personId and rs.event_id = dmp.eventId)
		LEFT JOIN dump.Competitions comp on dmp.competitionId = comp.id
		LEFT JOIN datalake.competitions cpn on dmp.competitionId = cpn.competition_id 
WHERE
	rs.single = dmp.best
	AND rs.state_id = @stateId
	AND rs.event_id = @eventId
ORDER BY rs.ranking ASC
`

const QueryRankingAverage = `
SELECT
	ra.wca_id 			AS wca_id,
	cpr.wca_name 		AS name,
	ra.state_id 		AS state_id,
	CASE WHEN ru.wca_id is not null THEN true ELSE false END AS registered,
	ra.event_id 		AS event_id,
	ra.ranking 			AS ranking,
	ra.average 			AS best,
	comp.id         	AS competition_id,
    comp.name       	AS competition_name,
    cpn.state_id  		AS competition_state,
    dmp.value1      	AS time_1,
    dmp.value2      	AS time_2,
    dmp.value3      	AS time_3,
    dmp.value4      	AS time_4,
    dmp.value5      	AS time_5,
    STR_TO_DATE(CONCAT(comp.year, ',', comp.endMonth, ',', comp.endDay), '%Y,%m,%d') AS ts
FROM
	datalake.ranking_average ra
		LEFT JOIN datalake.competitors cpr on ra.wca_id = cpr.wca_id
		LEFT JOIN app.registered_users ru on ra.wca_id = ru.wca_id
		LEFT JOIN dump.Results dmp on (ra.wca_id = dmp.personId and ra.event_id = dmp.eventId)
		LEFT JOIN dump.Competitions comp on dmp.competitionId = comp.id
		LEFT JOIN datalake.competitions cpn on dmp.competitionId = cpn.competition_id 
WHERE
	ra.average = dmp.average
	AND ra.state_id = @stateId
	AND ra.event_id = @eventId
ORDER BY ra.ranking ASC
`
