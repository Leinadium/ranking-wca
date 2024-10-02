package models

import (
	"time"

	"github.com/guregu/null/v5"
)

type PersonQuery struct {
	WcaId      string
	Name       string
	StateId    string
	Registered bool
	EventId    string
	Ranking    int32
	Best       float32
	CompId     string
	CompName   string
	Time1      null.Int32
	Time2      null.Int32
	Time3      null.Int32
	Time4      null.Int32
	Time5      null.Int32
	Ts         time.Time
}

type RankingQuery struct {
	WcaId      string
	Name       string
	Best       int32
	Ranking    int32
	Registered bool
	CompName   string
	Time1      null.Int32
	Time2      null.Int32
	Time3      null.Int32
	Time4      null.Int32
	Time5      null.Int32
}
