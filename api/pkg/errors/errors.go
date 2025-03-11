package errors

import (
	"log"

	"github.com/gin-gonic/gin"
)

func SetError(c *gin.Context, text string, code int) {
	c.JSON(code, gin.H{"error": text})
}

func LogSetError(c *gin.Context, text string, code int, err error) {
	errMsg := ""
	if err != nil {
		errMsg = err.Error()
	}
	log.Println("Error", text, errMsg)
	SetError(c, text, code)
}
