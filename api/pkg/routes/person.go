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
		m = models.UpdateWithBetterTimestamp(m, v)
	}

	// final response
	var rankings []models.PersonRankingsResponse

	for _, v := range m {
		rankings = append(rankings, models.PersonRankingsResponse{
			Event:            v.EventId,
			Ranking:          v.Ranking,
			Best:             v.Best,
			CompetitionId:    v.CompId,
			CompetitionName:  v.CompName,
			CompetitionState: null.NewString(v.CompState, true),
			Times:            [5]null.Int{v.Time1, v.Time2, v.Time3, v.Time4, v.Time5},
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

func (gs *GlobalState) GetPersonTable(c *gin.Context) {
	wcaIdReq := c.Param("id")
	if wcaIdReq == "" {
		errors.SetError(c, "id not provided", http.StatusBadRequest)
		return
	}

	// query
	var res []models.TablePerson
	query := gs.DB.Raw(models.QueryTablePerson, sql.Named("wcaId", wcaIdReq))
	if err := query.Find(&res).Error; err != nil {
		if errs.Is(err, gorm.ErrRecordNotFound) {
			errors.SetError(c, "wca id not found", http.StatusNotFound)
		} else {
			errors.SetError(c, "could not connect to database", http.StatusInternalServerError)
		}
		return
	}
	c.JSON(http.StatusOK, res)

}
