package files

import (
	"archive/zip"
	"errors"
	"io"
	"log"
	"os"
	"strings"

	"ranking.leinadium.dev/pkg/updater/utils"
)

func ExtractZip() error {
	r, err := zip.OpenReader(utils.DUMP_SQL_ZIP)
	if err != nil {
		return err
	}
	defer r.Close()

	// iterate over files
	done := false
	for _, f := range r.File {
		rc, err := f.Open()
		if err != nil {
			return err
		}
		defer rc.Close()

		if strings.HasSuffix(f.Name, ".sql") {
			log.Println("found sql file", f.Name)
			uncFile, err := os.Create(utils.DUMP_SQL_FINAL)
			if err != nil {
				return err
			}
			_, err = io.Copy(uncFile, rc)
			if err != nil {
				return err
			}
			done = true
			break
		}
	}
	if !done {
		return errors.New("sql not found")
	}
	return nil
}

func DeleteFiles() error {
	if err := os.Remove(utils.DUMP_SQL_ZIP); err != nil {
		return err
	}
	if err := os.Remove(utils.DUMP_SQL_FINAL); err != nil {
		return err
	}
	return nil
}
