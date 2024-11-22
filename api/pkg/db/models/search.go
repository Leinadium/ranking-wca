package models

type SearchQuery struct {
	WCAid   string `gorm:"column:wca_id" json:"wcaId"`
	WCAname string `gorm:"column:wca_name" json:"wcaName"`
}

const QuerySearchNameId = `
SELECT
	wca_id, wca_name
FROM
	datalake.competitors
WHERE
	wca_id LIKE @search
	OR wca_name LIKE @search
LIMIT 10
`
