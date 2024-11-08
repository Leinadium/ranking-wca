package wca

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"

	"ranking.leinadium.dev/pkg/config"
	"ranking.leinadium.dev/pkg/files"
)

const (
	EndpointOauthAuthorize = "https://www.worldcubeassociation.org/oauth/authorize"
	EndpointOauthToken     = "https://www.worldcubeassociation.org/oauth/token"
	EndpointApiMe          = "https://www.worldcubeassociation.org/api/v0/me"
)

type WCAresponse struct {
	ExportDate string `json:"export_date"`
	SqlUrl     string `json:"sql_url"`
	TsvUrl     string `json:"tsv_url"`
}

type WCAapi struct {
	config config.Config
}

func NewWCAapi(c config.Config) WCAapi {
	return WCAapi{config: c}
}

func (a WCAapi) Get() (WCAresponse, error) {
	// request from api
	var ret WCAresponse

	r, err := http.Get(a.config.WCA.ExportURL)
	if err != nil {
		println("Error", err.Error())
		return WCAresponse{}, err
	}
	if r == nil {
		return WCAresponse{}, errors.New("unknown error")
	}

	defer r.Body.Close()

	if r.StatusCode != 200 {
		return ret, errors.New("status code not 200")
	}

	err = json.NewDecoder(r.Body).Decode(&ret)
	return ret, err
}

func (a WCAapi) Download(url string) error {
	// create
	file, err := os.Create(files.ZipFile)
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
