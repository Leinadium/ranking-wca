package routes

import (
	"github.com/guregu/null/v5"
)

type RankingQuery struct {
	WcaId      string
	Name       string
	Best       int32
	Ranking    int32
	Registered bool
	CompName   string
	Time1      null.Int32
	Time2      null.Int32
	Time3      null.Int32
	Time4      null.Int32
	Time5      null.Int32
}

const QUERY_RANKINGS = `
SELECT
	ra.wca_id AS wca_id,
	ra.state_id AS state_id,
	CASE WHEN ru.wca_id is not null THEN true ELSE false END AS registered,
	ra.event_id as event_id,
	ra.ranking as ranking,
	ra.average as best,
	ra.competition_name as comp_name
FROM
	datalake.ranking_average ra
		LEFT JOIN app.registered_users ru on ra.wca_id = ru.wca_id
WHERE
	wca_id = :id
`
