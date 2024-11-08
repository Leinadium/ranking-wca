package models

import (
	"time"

	"github.com/guregu/null/v5"
)

type RankingResponse struct {
	Name            string      `json:"name"`
	WCAid           string      `json:"wcaId"`
	Best            null.Int    `json:"best"`
	Ranking         int         `json:"ranking"`
	Times           [5]null.Int `json:"times"`
	Registered      bool        `json:"registered"`
	CompetitionName string      `json:"compName"`
}

type RankingQuery struct {
	Name       string    `gorm:"column:name"`
	WCAid      string    `gorm:"column:wca_id"`
	Best       null.Int  `gorm:"column:best"`
	Ranking    int       `gorm:"column:ranking"`
	Registered string    `gorm:"column:registered"`
	CompId     string    `gorm:"competition_id"`
	CompName   string    `gorm:"column:competition_name"`
	Time1      null.Int  `gorm:"column:time_1"`
	Time2      null.Int  `gorm:"column:time_2"`
	Time3      null.Int  `gorm:"column:time_3"`
	Time4      null.Int  `gorm:"column:time_4"`
	Time5      null.Int  `gorm:"column:time_5"`
	Ts         time.Time `gorm:"column:ts"`
}

const QUERY_RANKINGS = `
SELECT
	ra.wca_id AS wca_id,
	ra.state_id AS state_id,
	CASE WHEN ru.wca_id is not null THEN true ELSE false END AS registered,
	ra.event_id as event_id,
	ra.ranking as ranking,
	ra.average as best,
	ra.competition_name as comp_name
FROM
	datalake.ranking_average ra
		LEFT JOIN app.registered_users ru on ra.wca_id = ru.wca_id
WHERE
	wca_id = :id
`
