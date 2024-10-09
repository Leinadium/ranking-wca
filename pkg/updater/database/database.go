package database

import (
	"errors"
	"fmt"
	"os"
	"os/exec"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"ranking.leinadium.dev/pkg/updater/consts"
)

func GetDB() (*gorm.DB, error) {
	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		consts.MYSQL_USER,
		consts.MYSQL_PASSWORD,
		consts.MYSQL_HOST,
		consts.MYSQL_PORT,
		consts.MYSQL_DEFAULT_DATABASE,
	)
	return gorm.Open(
		mysql.Open(dsn), &gorm.Config{},
	)
}

func SelectExportDate(db *gorm.DB) (WCAExportDb, error) {
	var ret WCAExportDb
	query := db.First(&ret)
	if query.Error != nil {
		// allow record not found
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return ret, nil
		}
		return ret, query.Error
	}
	return ret, nil
}

func ImportSql(filename string) error {
	cmd := exec.Command(
		"mysql",
		"--host", consts.MYSQL_HOST,
		"--port", consts.MYSQL_PORT,
		"--user", consts.MYSQL_USER,
		"-p"+consts.MYSQL_PASSWORD,
		consts.MYSQL_DUMP_DATABASE,
		"-e", "source "+filename,
	)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}

func RunProcedure(db *gorm.DB) error {
	return db.Transaction(func(tx *gorm.DB) error {
		return tx.Exec("CALL app.update()").Error
	})
}

func UpdateTimestamp(db *gorm.DB, exportDate string) error {
	// delete
	return db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Exec("TRUNCATE TABLE datalake.export_date").Error; err != nil {
			return err
		}
		// create
		t, err := time.Parse(time.RFC3339, exportDate)
		if err != nil {
			return err
		}

		return tx.Save(&WCAExportDb{Date: t}).Error
	})
}

type WCAExportDb struct {
	Date time.Time `gorm:"column:last_update;primaryKey"`
}

func (WCAExportDb) TableName() string {
	return "datalake.export_date"
}
