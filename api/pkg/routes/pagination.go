package routes

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func toInt(s string) int {
	if s == "" {
		return -1
	}
	x, err := strconv.Atoi(s)
	if err != nil {
		return -1
	}
	return x
}

type PaginationArgs struct {
	Page     int
	Quantity int
	Offset   int
}

// Obtain arguments for pagination
//
// Query args: p, q
//
//	p -> page number
//	q -> quantity per page (max limit = 50)
//
// if no args are detected, pagination is disabled
func PaginationArgsFromContext(c *gin.Context) PaginationArgs {
	p := toInt(c.Query("p"))
	q := toInt(c.Query("q"))

	q = min(q, 50)
	// if q == -1 {
	// 	q = 50
	// }

	offset := -1
	if p != -1 && q != -1 {
		offset = q * p
	}

	return PaginationArgs{
		Page:     p,
		Quantity: q,
		Offset:   offset,
	}
}

func (pg PaginationArgs) AddToSQL(statement string) string {
	var ret strings.Builder
	ret.WriteString(statement)

	if pg.Quantity != -1 {
		ret.WriteString(fmt.Sprintf(" LIMIT %d", pg.Quantity))
	}
	if pg.Offset != -1 {
		ret.WriteString(fmt.Sprintf(" OFFSET %d", pg.Offset))
	}
	return ret.String()
}
