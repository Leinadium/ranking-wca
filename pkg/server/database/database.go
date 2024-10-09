package database

import (
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"ranking.leinadium.dev/pkg/server/utils"
)

var db *gorm.DB

func GetDB() (*gorm.DB, error) {
	if db == nil {
		newDb, err := gorm.Open(mysql.Open(os.Getenv("GORM_DSN")), &gorm.Config{})
		if err == nil {
			db = newDb
			return db, nil
		} else {
			return nil, err
		}
	}
	return db, nil
}

func GetDbOrSetError(c *gin.Context) *gorm.DB {
	db, err := GetDB()
	if err != nil {
		utils.LogSetError(c, "error connecting to database", 500, err)
		return nil
	}
	return db
}
