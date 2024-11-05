package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"github.com/gin-gonic/gin"
	"ranking.leinadium.dev/pkg/errors"
)

func (gs *GlobalState) GetAuthEndpoint(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"url": fmt.Sprintf("https://worldcubeassociation.org/oauth/authorize?client_id=%s&redirect_uri=%s&response_type=code&scope=",
			gs.Config.Auth.ClientId,
			gs.Config.Auth.RedirectURI,
		),
	})
}

func (gs *GlobalState) GetAuthCallback(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		errors.SetError(c, "no code provided", http.StatusBadRequest)
		return
	}

	values := url.Values{}
	values.Add("grant_type", "authorization_code")
	values.Add("code", code)
	values.Add("client_id", gs.Config.Auth.ClientId)
	values.Add("client_secret", gs.Config.Auth.ClientSecret)
	values.Add("redirect_uri", gs.Config.Auth.RedirectURI)

	res, err := http.PostForm(
		"https://www.worldcubeassociation.org/oauth/token",
		values,
	)
	if err != nil {
		errors.SetError(c, "could not reach wca", http.StatusServiceUnavailable)
		return
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		errors.SetError(c, fmt.Sprintf("invalid status code from wca: %d", res.StatusCode), http.StatusInternalServerError)
		return
	}

	var parsedRes struct {
		AccessToken  string `json:"access_token"`
		TokenType    string `json:"token_type"`
		ExpiresIn    int    `json:"expires_in"`
		RefreshToken string `json:"refresh_token"`
		Scope        string `json:"scope"`
		CreatedAt    int    `json:"created_at"`
	}
	if json.NewDecoder(res.Body).Decode(&parsedRes) != nil {
		errors.SetError(c, "invalid response from wca", http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"access_token": parsedRes.AccessToken,
		"expires_in":   parsedRes.ExpiresIn,
	})

}
