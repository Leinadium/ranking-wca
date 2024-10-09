package files

import (
	"archive/zip"
	"errors"
	"io"
	"log"
	"os"
	"strings"
)

func ExtractZip(zipfile, sqlfile string) error {
	// r, err := zip.OpenReader(consts.DUMP_SQL_ZIP)
	r, err := zip.OpenReader(zipfile)

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
			uncFile, err := os.Create(sqlfile)
			// uncFile, err := os.Create(consts.DUMP_SQL_FINAL)
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

func DeleteFiles(zipfile, sqlfile string) error {
	if err := os.Remove(zipfile); err != nil {
		return err
	}
	if err := os.Remove(sqlfile); err != nil {
		return err
	}
	return nil
}
