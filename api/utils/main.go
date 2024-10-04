package utils

import (
	"log"

	"github.com/gin-gonic/gin"
)

func SetError(c *gin.Context, text string, code int) {
	c.JSON(code, gin.H{"error": text})
}

func LogSetError(c *gin.Context, text string, code int, err error) {
	log.Println("Error", text, err.Error())
	SetError(c, text, code)
}
