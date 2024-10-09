package wca

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"

	"ranking.leinadium.dev/pkg/updater/utils"
)

func GetWcaApi() (WCAExportApiResponse, error) {
	// request from api
	var ret WCAExportApiResponse

	r, err := http.Get(utils.WCA_EXPORT_PUBLIC)
	if err != nil {
		println("Error", err.Error())
	}
	defer r.Body.Close()

	if r.StatusCode != 200 {
		return ret, errors.New("status code not 200")
	}

	err = json.NewDecoder(r.Body).Decode(&ret)
	return ret, err
}

func DownloadWcaDump(url string) error {
	// create
	file, err := os.Create(utils.DUMP_SQL_ZIP)
	if err != nil {
		return err
	}
	defer file.Close()

	// get
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	// store
	if resp.StatusCode >= 400 {
		return fmt.Errorf("invalid status code %d", resp.StatusCode)
	}

	n, err := io.Copy(file, resp.Body)
	if err != nil {
		return err
	}
	if n == 0 {
		return fmt.Errorf("empty zip file")
	}
	return nil
}

type WCAExportApiResponse struct {
	ExportDate string `json:"export_date"`
	SqlUrl     string `json:"sql_url"`
	TsvUrl     string `json:"tsv_url"`
}
