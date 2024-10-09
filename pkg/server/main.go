package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"ranking.leinadium.dev/pkg/config"
	"ranking.leinadium.dev/pkg/db"
	"ranking.leinadium.dev/pkg/routes"
)

func Main() {
	router := gin.Default()

	router.SetTrustedProxies(nil)
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://ranking.leinadium.dev", "http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	c := config.ParseTOML("config.toml")

	gs := routes.GlobalState{
		Config: c,
		DB:     db.NewWCAdb(c).DB,
	}

	api := router.Group("/api")
	api.GET("/person/:mode/:id", gs.GetPerson)
	// api.GET("/ranking/:mode/:id", nil)

	_ = router.Run()
}
