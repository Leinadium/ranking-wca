package routes

import (
	"encoding/json"
	errs "errors"
	"fmt"
	"net/http"
	"net/url"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/guregu/null/v5"
	"gorm.io/gorm"
	"ranking.leinadium.dev/pkg/db/models"
	"ranking.leinadium.dev/pkg/errors"
	"ranking.leinadium.dev/pkg/wca"
)

func (gs *GlobalState) GetAuthEndpoint(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"url": fmt.Sprintf("%s?client_id=%s&redirect_uri=%s&response_type=code&scope=",
			wca.EndpointOauthAuthorize,
			gs.Config.Auth.ClientId,
			gs.Config.Auth.RedirectURI,
		),
	})
}

func (gs *GlobalState) GetAuthCallback(c *gin.Context) {
	// authorizing with wca
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
		wca.EndpointOauthToken,
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

	// obtaining <me> information
	req, _ := http.NewRequest("GET", wca.EndpointApiMe, nil)
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", parsedRes.AccessToken))
	client := http.Client{}
	res, err = client.Do(req)
	if err != nil {
		errors.SetError(c, "could not reach wca api", http.StatusInternalServerError)
		return
	}

	var parsedFinal struct {
		Me struct {
			Name    string `json:"name"`
			WcaID   string `json:"wca_id"`
			Country string `json:"country_iso2"`
		} `json:"me"`
	}
	if json.NewDecoder(res.Body).Decode(&parsedFinal) != nil {
		errors.SetError(c, "invalid response from wca api /me", http.StatusInternalServerError)
		return
	}

	// check database
	var registeredUser models.RegisteredUser
	var state null.String
	var lastUpdate null.Time
	if err = gs.DB.Take(&registeredUser).Error; err != nil {
		if errs.Is(err, gorm.ErrRecordNotFound) {
			state = null.NewString("", false)
			lastUpdate = null.NewTime(time.Time{}, false)
		} else {
			errors.SetError(c, "could not reach database", http.StatusInternalServerError)
			return
		}
	} else {
		state = null.NewString(registeredUser.StateID, true)
		lastUpdate = null.NewTime(registeredUser.RegisterDate.UTC(), true)
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token": parsedRes.AccessToken,
		"expires_in":   parsedRes.ExpiresIn,
		"name":         parsedFinal.Me.Name,
		"wca_id":       parsedFinal.Me.WcaID,
		"register": gin.H{
			"is_able":  parsedFinal.Me.Country == "BR",
			"state_id": state,
			"updated":  lastUpdate,
		},
	})

}
