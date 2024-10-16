package files

import (
	"archive/zip"
	"errors"
	"io"
	"log"
	"os"
	"strings"
)

const (
	ZipFile  = "wca_export.sql.zip"
	DumpFile = "wca_export.sql"
)

func ExtractZip() error {
	// r, err := zip.OpenReader(consts.DUMP_SQL_ZIP)
	r, err := zip.OpenReader(ZipFile)

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
			uncFile, err := os.Create(DumpFile)
			// uncFile, err := os.Create(consts.DUMP_SQL_FINAL)
			if err != nil {
				return err
			}
			_, err = io.Copy(uncFile, rc)
			if err != nil {
				return err
			}
			done = true
			uncFile.Close()
			break
		}
	}
	if !done {
		return errors.New("sql not found")
	}
	return nil
}

func DeleteFiles() error {
	if err := os.Remove(ZipFile); err != nil {
		return err
	}
	if err := os.Remove(DumpFile); err != nil {
		return err
	}
	return nil
}
