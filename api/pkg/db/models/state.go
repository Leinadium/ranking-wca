package models

type State struct {
	StateID   string `gorm:"column:state_id;primaryKey" json:"id"`
	StateName string `gorm:"column:state_name" json:"name"`
}

func (State) TableName() string {
	return "app.states"
}
