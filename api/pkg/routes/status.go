package routes

import (
	errs "errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"ranking.leinadium.dev/pkg/db/models"
	"ranking.leinadium.dev/pkg/errors"
)

func (gs *GlobalState) GetStatus(c *gin.Context) {
	var exportDate models.ExportDate

	if err := gs.DB.First(&exportDate).Error; err != nil {
		if errs.Is(err, gorm.ErrRecordNotFound) {
			errors.SetError(c, "last update not found", http.StatusNotFound)
		} else {
			errors.SetError(c, "could not coonect to database", http.StatusInternalServerError)
		}
	} else {
		c.JSON(http.StatusOK, gin.H{
			"lastUpdate": exportDate.Date.Format(time.RFC3339),
		})
	}
}
