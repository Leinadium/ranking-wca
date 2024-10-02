package routes

const QUERY_X = `
SELECT
	dlk.wca_id      AS wca_id,
	ct.wca_name     AS name,
	dlk.state_id    AS state_id,
	CASE WHEN ru.wca_id is not null THEN true ELSE false END AS registered,
	dlk.event_id    AS event_id,
	dlk.ranking 	AS ranking,
	dlk.single      AS single,
	comp.id         AS competition_id,
	comp.name       AS competition_name,
	dmp.value1		AS time_1,
	dmp.value2		AS time_2,
	dmp.value3		AS time_3,
	dmp.value4		AS time_4,
	dmp.value5		AS time_5,
	STR_TO_DATE(CONCAT(comp.year, ',', comp.endMonth, ',', comp.endDay), '%Y,%m,%d') AS ts
FROM
	datalake.ranking_single dlk
		LEFT JOIN datalake.competitors ct on dlk.wca_id = ct.wca_id
		LEFT JOIN app.registered_users ru on dlk.wca_id = ru.wca_id
		LEFT JOIN dump.Results dmp on (dlk.wca_id = dmp.personId and dlk.event_id = dmp.eventId)
		LEFT JOIN dump.Competitions comp on (dmp.competitionId = comp.id)
WHERE
	dlk.single = dmp.best
	AND dlk.wca_id = :id
`
