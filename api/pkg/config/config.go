package config

import (
	"log"

	"github.com/BurntSushi/toml"
)

type Config struct {
	Mysql struct {
		Host     string `toml:"host"`
		Port     int    `toml:"port"`
		User     string `toml:"user"`
		Password string `toml:"password"`
		Tables   struct {
			Default string `toml:"default"`
			Dump    string `toml:"dump"`
		}
	} `toml:"mysql"`
	WCA struct {
		ExportURL string `toml:"export_url"`
	} `toml:"wca"`
	Auth struct {
		ClientId     string `toml:"client_id"`
		ClientSecret string `toml:"client_secret"`
		RedirectURI  string `toml:"redirect_uri"`
	} `toml:"auth"`
}

func ParseTOML(tomlfile string) Config {
	var config Config
	if _, err := toml.DecodeFile(tomlfile, &config); err != nil {
		log.Fatalf("Could not read toml: %s", err.Error())
	}
	return config
}
