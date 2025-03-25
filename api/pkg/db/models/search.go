package models

import "github.com/guregu/null/v5"

type SearchQuery struct {
	WCAid   string      `gorm:"column:wca_id" json:"wcaId"`
	WCAname string      `gorm:"column:wca_name" json:"wcaName"`
	StateID null.String `gorm:"column:state_id" json:"stateId"`
}

const QuerySearchNameId = `
SELECT
	c.wca_id		AS wca_id,
	c.wca_name		AS wca_name,
	a.state_id		AS state_id
FROM
	datalake.competitors c
        LEFT JOIN datalake.all_persons_with_states a on c.wca_id = a.wca_id
WHERE
	c.wca_id LIKE @search
	OR c.wca_name LIKE @search
`
