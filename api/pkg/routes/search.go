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

	pageArgs := PaginationArgsFromContext(c)
	searchFinal := fmt.Sprintf("%%%s%%", strings.ToLower(searchText))
	ss := []models.SearchQuery{}

	totalItems, err := PaginatedQuery(
		gs.DB,
		pageArgs,
		&ss,
		string(models.QuerySearchNameId),
		sql.Named("search", searchFinal),
	)
	if err != nil {
		errors.LogSetError(c, err.Error(), http.StatusInternalServerError, err)
		return
	}

	if ss == nil || totalItems == 0 {
		ss = make([]models.SearchQuery, 0) // empty slice
	}

	c.JSON(http.StatusOK, gin.H{
		"totalItems": totalItems,
		"results":    ss,
	})
}
