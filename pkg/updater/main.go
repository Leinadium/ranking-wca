package updater

import (
	"log"
	"time"

	"ranking.leinadium.dev/pkg/updater/consts"
	"ranking.leinadium.dev/pkg/updater/database"
	"ranking.leinadium.dev/pkg/updater/files"
	"ranking.leinadium.dev/pkg/updater/wca"
)

func Main() {
	// connect to database
	log.Println("connecting to db")
	db, err := database.GetDB()
	if err != nil {
		log.Fatalln("could not connect to db", err.Error())
	}

	// fetch from db
	log.Println("fetching from db")
	wcaExportDb, err := database.SelectExportDate(db)
	if err != nil {
		log.Fatalln("could not get export date from db", err.Error())
	}

	// get from wca
	log.Println("fetching from wca")
	wcaExportApi, err := wca.GetWcaApi()
	if err != nil {
		log.Fatalln("could not get API", err.Error())
	}

	if wcaExportDb.Date.Format(time.RFC3339) == wcaExportApi.ExportDate {
		log.Fatalln("no updates. Closing...")
	}

	// downloading
	log.Println("downloading...")
	err = wca.DownloadWcaDump(wcaExportApi.SqlUrl)
	if err != nil {
		log.Fatalln("could not download wca dump", err.Error())
	}

	// extract
	log.Println("extracting...")
	if err := files.ExtractZip(); err != nil {
		log.Fatalln("could not extract zip", err.Error())
	}

	// importing
	// OBS: this will not rollback if it fails!
	log.Println("importing dump...")
	if err := database.ImportSql(consts.DUMP_SQL_FINAL); err != nil {
		log.Fatalln("could not import dump", err.Error())
	}

	// updating
	// OBS: this will also not rollback if it fails!
	log.Println("running updater")
	if err := database.RunProcedure(db); err != nil {
		log.Fatalln("could not run update", err.Error())
	}
	if err := database.UpdateTimestamp(db, wcaExportApi.ExportDate); err != nil {
		log.Fatalln("could not update timestamp", err.Error())
	}

	// cleaning
	log.Println("cleaning up")
	if err := files.DeleteFiles(); err != nil {
		log.Fatalln("could not delete files", err.Error())
	}
}
