package routes

import (
	"database/sql"
	"fmt"
	"net/http"
	"strings"

	"ranking.leinadium.dev/pkg/db/models"
	"ranking.leinadium.dev/pkg/errors"

	"github.com/gin-gonic/gin"
)

func (gs *GlobalState) GetSearch(c *gin.Context) {
	searchText := c.Query("s")
	if len(searchText) < 3 {
		errors.SetError(c, "use more then 3 letters to search", http.StatusBadRequest)
		return
	}

	searchFinal := fmt.Sprintf("%%%s%%", strings.ToLower(searchText))

	ss := []models.SearchQuery{}
	query := gs.DB.Raw(models.QuerySearchNameId, sql.Named("search", searchFinal))
	if err := query.Find(&ss).Error; err != nil {
		errors.LogSetError(c, "could not query dataabase", http.StatusInternalServerError, err)
		return
	}

	if ss == nil {
		ss = make([]models.SearchQuery, 0) // empty slice
	}

	c.JSON(http.StatusOK, gin.H{"results": ss})
}
