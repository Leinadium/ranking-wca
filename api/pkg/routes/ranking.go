package routes

import (
	"database/sql"
	"net/http"
	"sort"

	"github.com/guregu/null/v5"

	"github.com/gin-gonic/gin"
	"ranking.leinadium.dev/pkg/db/models"
	"ranking.leinadium.dev/pkg/errors"
)

func (gs *GlobalState) GetRankingWithModeEvent(c *gin.Context) {
	modeReq := c.Param("mode")
	if modeReq == "" {
		errors.SetError(c, "mode not provided", http.StatusBadRequest)
		return
	}
	eventReq := c.Param("event")
	if eventReq == "" {
		errors.SetError(c, "event not provided", http.StatusBadRequest)
		return
	}
	stateReq := c.Param("state")
	if stateReq == "" {
		errors.SetError(c, "state not provided", http.StatusBadRequest)
		return
	}
	pageArgs := PaginationArgsFromContext(c)

	// getting query string
	var rawSql string
	if modeReq == "single" {
		rawSql = models.QueryRankingSingle
	} else if modeReq == "average" {
		rawSql = models.QueryRankingAverage
	} else {
		errors.SetError(c, "invalid mode", http.StatusBadRequest)
		return
	}

	// querying the database
	pqs := []models.RankingQuery{}
	query := gs.DB.Raw(
		pageArgs.AddToSQL(rawSql),
		sql.Named("eventId", eventReq),
		sql.Named("stateId", stateReq),
	)

	// obtaining results
	if err := query.Find(&pqs).Error; err != nil {
		errors.LogSetError(c, "could not query database", http.StatusInternalServerError, err)
		return
	}

	// check no data
	if len(pqs) == 0 {
		errors.SetError(c, "no data", http.StatusNotFound)
		return
	}

	var totalItems int = int(len(pqs))
	// if data is equal than pagination quantity, get total count
	if totalItems == pageArgs.Quantity {
		var countRes struct {
			Count int
		}
		// query database
		query := gs.DB.Raw(pageArgs.AddCount(rawSql),
			sql.Named("eventId", eventReq),
			sql.Named("stateId", stateReq),
		)
		// retrieve value
		if err := query.First(&countRes).Error; err != nil {
			errors.LogSetError(c, "could not query database for count", http.StatusInternalServerError, err)
			return
		}
		totalItems = int(countRes.Count)
	}

	// create values and removing duplicates
	m := make(map[string]models.RankingQuery)
	for _, v := range pqs {
		m = models.UpdateWithBetterTimestamp(m, v)
	}

	// final response
	var results []models.RankingResponse
	for _, v := range m {
		results = append(results, models.RankingResponse{
			Name:       v.Name,
			WCAid:      v.WCAid,
			State:      v.State,
			Best:       v.Best,
			Ranking:    v.Ranking,
			Registered: v.Registered,
			CompId:     v.CompId,
			CompName:   v.CompName,
			CompState:  v.CompState,
			Times:      [5]null.Int{v.Time1, v.Time2, v.Time3, v.Time4, v.Time5},
		})
	}

	// sorting results
	// OBS: why are we sorting again, if query has ORDER BY?
	sort.Slice(results, func(i, j int) bool {
		return results[i].Ranking < results[j].Ranking
	})

	c.JSON(http.StatusOK, gin.H{
		"totalItems": totalItems,
		"results":    results,
	})
}
