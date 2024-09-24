package models

import "github.com/guregu/null/v5"

type RankingAverage struct {
	WcaId   string     `json:"wcaId" gorm:"column:wca_id"`
	StateId string     `json:"stateId" gorm:"column:state_id"`
	EventId string     `json:"eventId" gorm:"column:event_id"`
	Result  null.Int32 `json:"result" gorm:"column:average"`
	Ranking int32      `json:"ranking" gorm:"column:ranking"`
}

func (RankingAverage) TableName() string {
	return "datalake.ranking_single"
}
