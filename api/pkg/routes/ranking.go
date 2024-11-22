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

	// query
	var rawSql string
	if modeReq == "single" {
		rawSql = models.QueryRankingSingle
	} else if modeReq == "average" {
		rawSql = models.QueryRankingAverage
	} else {
		errors.SetError(c, "invalid mode", http.StatusBadRequest)
		return
	}

	pqs := []models.RankingQuery{}
	query := gs.DB.Raw(
		pageArgs.AddToSQL(rawSql),
		sql.Named("eventId", eventReq),
		sql.Named("stateId", stateReq),
	)

	if err := query.Find(&pqs).Error; err != nil {
		errors.LogSetError(c, "could not query database", http.StatusInternalServerError, err)
		return
	}

	if len(pqs) == 0 {
		errors.SetError(c, "no data", http.StatusNotFound)
		return
	}

	// create values and removing duplicates
	m := make(map[string]models.RankingQuery)
	for _, v := range pqs {
		m = models.UpdateWithBetterTimestamp(m, v)
	}

	// final response
	var ret []models.RankingResponse
	for _, v := range m {
		ret = append(ret, models.RankingResponse{
			Name:       v.Name,
			WCAid:      v.WCAid,
			Best:       v.Best,
			Ranking:    v.Ranking,
			Registered: v.Registered,
			CompId:     v.CompId,
			CompName:   v.CompName,
			CompState:  null.NewString(v.CompName, true),
			Times:      [5]null.Int{v.Time1, v.Time2, v.Time3, v.Time4, v.Time5},
		})
	}

	// sorting results
	sort.Slice(ret, func(i, j int) bool {
		return ret[i].Ranking < ret[j].Ranking
	})
	c.JSON(http.StatusOK, ret)
}
