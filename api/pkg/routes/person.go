package routes

import (
	"database/sql"
	"net/http"

	errs "errors"

	"github.com/gin-gonic/gin"
	"github.com/guregu/null/v5"
	"gorm.io/gorm"
	"ranking.leinadium.dev/pkg/db/models"
	"ranking.leinadium.dev/pkg/errors"
)

func updateWithBetter(m map[string]models.PersonQuery, p models.PersonQuery) map[string]models.PersonQuery {
	curr, ok := m[p.EventId]
	if !ok {
		m[p.EventId] = p
		return m
	}
	// check ts
	// if is after, ignore
	if curr.Ts.After(p.Ts) {
		return m
	}
	// if is equals, check round (higher wins)
	// if curr.Ts.Equal(p.Ts) {
	// 	if curr.Round > p.Round {
	// 		return m
	// 	}
	// }
	// if is before, or higher round, update
	m[p.EventId] = p
	return m
}

func (gs *GlobalState) GetPersonWithMode(c *gin.Context) {
	modeReq := c.Param("mode")
	if modeReq == "" {
		errors.SetError(c, "mode not provided", http.StatusBadRequest)
		return
	}
	wcaIdReq := c.Param("id")
	if wcaIdReq == "" {
		errors.SetError(c, "id not provided", http.StatusBadRequest)
		return
	}

	// query
	var rawSql string
	if modeReq == "single" {
		rawSql = models.QueryPersonSingle
	} else if modeReq == "average" {
		rawSql = models.QueryPersonAverage
	} else {
		errors.SetError(c, "invalid mode", http.StatusBadRequest)
		return
	}

	pqs := []models.PersonQuery{}
	query := gs.DB.Raw(rawSql, sql.Named("wcaId", wcaIdReq))

	if err := query.Find(&pqs).Error; err != nil {
		errors.LogSetError(c, "could not query database", http.StatusInternalServerError, err)
		return
	}

	if len(pqs) == 0 {
		errors.SetError(c, "could not find wca id", http.StatusNotFound)
		return
	}

	// create values and removing duplicates
	m := make(map[string]models.PersonQuery)
	for _, v := range pqs {
		m = updateWithBetter(m, v)
	}

	// final response
	var rankings []models.PersonRankingsResponse

	for _, v := range m {
		rankings = append(rankings, models.PersonRankingsResponse{
			Event:           v.EventId,
			Ranking:         v.Ranking,
			Best:            v.Best,
			CompetitionName: v.CompName,
			Times:           [5]null.Int{v.Time1, v.Time2, v.Time3, v.Time4, v.Time5},
		})
	}
	ret := models.PersonResponse{
		Name:       pqs[0].Name,
		State:      pqs[0].StateId,
		Registered: pqs[0].Registered,
		Rankings:   rankings,
	}

	c.JSON(http.StatusOK, ret)
}

func (gs *GlobalState) GetPersonInfo(c *gin.Context) {
	wcaIdReq := c.Param("id")
	if wcaIdReq == "" {
		errors.SetError(c, "id not provided", http.StatusBadRequest)
		return
	}

	// query
	var res models.PersonInfo
	query := gs.DB.Raw(models.QueryPersonInfo, sql.Named("wcaId", wcaIdReq))
	if err := query.First(&res).Error; err != nil {
		if errs.Is(err, gorm.ErrRecordNotFound) {
			errors.SetError(c, "wca id not found", http.StatusNotFound)
		} else {
			errors.SetError(c, "could not connect to database", http.StatusInternalServerError)
		}
		return
	}
	c.JSON(http.StatusOK, res)
}
