package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"ranking.leinadium.dev/pkg/db/models"
	"ranking.leinadium.dev/pkg/errors"
)

func (gs *GlobalState) GetStates(c *gin.Context) {
	var states []models.State

	if err := gs.DB.Find(&states).Error; err != nil {
		errors.LogSetError(c, "could not fetch states", http.StatusInternalServerError, err)
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"results": states,
		})
	}
}
