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

	config := config.ParseTOML("config.toml")

	gs := routes.GlobalState{
		Config: config,
		DB:     db.NewWCAdb(config).DB,
	}

	api := router.Group("/api")
	api.GET("/status", gs.GetStatus)
	api.GET("/search", gs.GetSearch)
	api.GET("/states", gs.GetStates)

	auth := api.Group("/auth")
	auth.GET("/endpoint", gs.GetAuthEndpoint)
	auth.GET("/callback", gs.GetAuthCallback)
	auth.POST("/register", gs.PostRegisterState)

	person := api.Group("/person")
	person.GET("/table/:id", gs.GetPersonTable)
	person.GET("/info/:id", gs.GetPersonInfo)
	person.GET("/:mode/:id", gs.GetPersonWithMode)

	ranking := api.Group("/ranking")
	ranking.GET("/:mode/:event/:state", gs.GetRankingWithModeEvent)

	_ = router.Run()
}
