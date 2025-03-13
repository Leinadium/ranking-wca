package updater

import (
	"log"
	"os"
	"time"

	"ranking.leinadium.dev/pkg/config"
	"ranking.leinadium.dev/pkg/db"
	"ranking.leinadium.dev/pkg/files"
	"ranking.leinadium.dev/pkg/wca"
)

func Main() {
	// config
	c := config.ParseTOML("config.toml")

	// connect to database
	log.Println("initializing objects")
	db := db.NewWCAdb(c)
	api := wca.NewWCAapi(c)

	// parsing extra env arg
	if os.Getenv("ONLY_REFRESH") != "" {
		err := db.RunRefresh()
		if err != nil {
			log.Fatalln("could not run refresh", err.Error())
		}
		log.Println("successful refresh")
		return
	}

	// fetch from db
	log.Println("fetching from db")
	wcaExportDb, err := db.ExportDate()
	if err != nil {
		log.Fatalln("could not get export date from db", err.Error())
	}

	// get from wca
	log.Println("fetching from wca")
	wcaExportApi, err := api.Get()
	if err != nil {
		log.Fatalln("could not get API", err.Error())
	}

	if wcaExportDb.Date.Format(time.RFC3339) == wcaExportApi.ExportDate {
		log.Fatalln("no updates. Closing...")
	}

	// downloading
	log.Println("downloading...")
	err = api.Download(wcaExportApi.SqlUrl)
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
	if err := db.ImportFile(files.DumpFile); err != nil {
		log.Fatalln("could not import dump", err.Error())
	}

	// updating
	// OBS: this will also not rollback if it fails!
	log.Println("running updater")
	if err := db.RunUpdate(); err != nil {
		log.Fatalln("could not run update", err.Error())
	}
	if err := db.UpdateTimestamp(wcaExportApi.ExportDate); err != nil {
		log.Fatalln("could not update timestamp", err.Error())
	}

	// cleaning
	log.Println("cleaning up")
	if err := files.DeleteFiles(); err != nil {
		log.Fatalln("could not delete files", err.Error())
	}
}
