package models

import "time"

type ExportDate struct {
	Date time.Time `gorm:"column:last_update;primaryKey"`
}

func (ExportDate) TableName() string {
	return "datalake.export_date"
}
