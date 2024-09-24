package models

import "time"

type ExportDate struct {
	LastUpdate time.Time `json:"lastUpdate" gorm:"column:last_update"`
	NextUpdate time.Time `json:"nextUpdate" gorm:"column:next_update"`
}

func (ExportDate) TableName() string {
	return "datalake.export_date"
}
