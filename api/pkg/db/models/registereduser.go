package models

import "time"

type RegisteredUser struct {
	WcaID        string    `gorm:"column:wca_id"`
	StateID      string    `gorm:"column:state_id"`
	RegisterDate time.Time `gorm:"column:register_date"`
}

func (RegisteredUser) TableName() string {
	return "app.registered_users"
}
