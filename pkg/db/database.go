package db

import (
	"fmt"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"ranking.leinadium.dev/pkg/config"
)

type WCAdb struct {
	DB *gorm.DB
}

func NewWCAdb(c config.Config) WCAdb {
	db, err := gorm.Open(
		mysql.Open(
			fmt.Sprintf(
				"%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
				c.Mysql.User,
				c.Mysql.Password,
				c.Mysql.Host,
				c.Mysql.Port,
				c.Mysql.Tables.Default,
			),
		), &gorm.Config{},
	)
	if err != nil {
		log.Fatalf("Could not connect to database: %s", err.Error())
	}
	return WCAdb{DB: db}
}
