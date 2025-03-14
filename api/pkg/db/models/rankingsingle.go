package models

import "github.com/guregu/null/v5"

type RankingSingle struct {
	WcaId   string     `json:"wcaId" gorm:"column:wca_id"`
	StateId string     `json:"stateId" gorm:"column:state_id"`
	EventId string     `json:"eventId" gorm:"column:event_id"`
	Result  null.Int64 `json:"result" gorm:"column:single"`
	Ranking int32      `json:"ranking" gorm:"column:ranking"`
}

func (RankingSingle) TableName() string {
	return "datalake.ranking_single"
}
