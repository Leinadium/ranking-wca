package routes

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/guregu/null/v5"
	"ranking.leinadium.dev/pkg/db/models"
	"ranking.leinadium.dev/pkg/utils"
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

func (gs *GlobalState) GetPerson(c *gin.Context) {
	modeReq := c.Param("mode")
	if modeReq == "" {
		utils.SetError(c, "mode not provided", 400)
		return
	}
	wcaIdReq := c.Param("id")
	if wcaIdReq == "" {
		utils.SetError(c, "id not provided", 400)
		return
	}

	// query
	pqs := []models.PersonQuery{}
	query := gs.DB.Raw(models.QUERY_PERSON, sql.Named("wcaId", wcaIdReq))

	if err := query.Find(&pqs).Error; err != nil {
		utils.LogSetError(c, "could not query database", 500, err)
		return
	}

	if len(pqs) == 0 {
		utils.SetError(c, "could not find wca id", 404)
		return
	}

	// create values and removing duplicates
	m := make(map[string]models.PersonQuery)
	for _, v := range pqs {
		m = updateWithBetter(m, v)
	}

	// final response
	var rankings []models.PersonRankingResponse

	for _, v := range m {
		rankings = append(rankings, models.PersonRankingResponse{
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
