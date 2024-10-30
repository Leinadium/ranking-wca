package routes

import (
	"gorm.io/gorm"
	"ranking.leinadium.dev/pkg/config"
)

type GlobalState struct {
	DB     *gorm.DB
	Config config.Config
}
