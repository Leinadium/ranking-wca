package main

import (
	"log"
	"time"
)

func main() {
	// connect to database
	log.Println("connecting to db")
	db, err := GetDB()
	if err != nil {
		log.Fatalln("could not connect to db", err.Error())
	}

	// fetch from db
	log.Println("fetching from db")
	wcaExportDb, err := SelectExportDate(db)
	if err != nil {
		log.Fatalln("could not get export date from db", err.Error())
	}

	// get from wca
	log.Println("fetching from wca")
	wcaExportApi, err := GetWcaApi()
	if err != nil {
		log.Fatalln("could not get API", err.Error())
	}

	if wcaExportDb.Date.Format(time.RFC3339) == wcaExportApi.ExportDate {
		log.Fatalln("no updates. Closing...")
	}

	// downloading
	log.Println("downloading...")
	err = DownloadWcaDump(wcaExportApi.SqlUrl)
	if err != nil {
		log.Fatalln("could not download wca dump", err.Error())
	}

	// extract
	log.Println("extracting...")
	if err := ExtractZip(); err != nil {
		log.Fatalln("could not extract zip", err.Error())
	}

	// importing
	// OBS: this will not rollback if it fails!
	log.Println("importing dump...")
	if err := ImportSql(DUMP_SQL_FINAL); err != nil {
		log.Fatalln("could not import dump", err.Error())
	}

	// updating
	// OBS: this will also not rollback if it fails!
	log.Println("running updater")
	if err := RunProcedure(db); err != nil {
		log.Fatalln("could not run update", err.Error())
	}
	if err := UpdateTimestamp(db, wcaExportApi.ExportDate); err != nil {
		log.Fatalln("could not update timestamp", err.Error())
	}

	// cleaning
	log.Println("cleaning up")
	if err := DeleteFiles(); err != nil {
		log.Fatalln("could not delete files", err.Error())
	}
}
