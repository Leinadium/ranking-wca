package db

import (
	"errors"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strconv"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"ranking.leinadium.dev/pkg/config"
	"ranking.leinadium.dev/pkg/db/models"
)

type WCAdb struct {
	DB     *gorm.DB
	config config.Config
}

func (db *WCAdb) ImportFile(filename string) error {
	cmd := exec.Command(
		"mysql",
		"--host", db.config.Mysql.Host,
		"--port", strconv.Itoa(db.config.Mysql.Port),
		"--user", db.config.Mysql.User,
		"-p"+db.config.Mysql.Password,
		db.config.Mysql.Tables.Dump,
		"-e", "source "+filename,
	)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}

func (db *WCAdb) RunUpdate() error {
	return db.DB.Transaction(func(tx *gorm.DB) error {
		return tx.Exec("CALL app.update()").Error
	})
}

func (db *WCAdb) ExportDate() (models.ExportDate, error) {
	var ret models.ExportDate
	query := db.DB.Take(&ret)
	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return ret, nil
		}
		return ret, query.Error
	}
	return ret, nil
}

func (db *WCAdb) UpdateTimestamp(exportTimestamp string) error {
	// create
	t, err := time.Parse(time.RFC3339, exportTimestamp)
	if err != nil {
		return err
	}

	// delete
	return db.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Exec("TRUNCATE TABLE datalake.export_date").Error; err != nil {
			return err
		}
		return tx.Save(&models.ExportDate{Date: t}).Error
	})
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
	return WCAdb{DB: db, config: c}
}
