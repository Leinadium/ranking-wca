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

type ResponseAPIme struct {
	Me struct {
		Name    string `json:"name"`
		WCAid   string `json:"wca_id"`
		Country string `json:"country_iso2"`
	} `json:"me"`
}

func requestMe(c *gin.Context, accessToken string) (ResponseAPIme, bool) {
	req, _ := http.NewRequest("GET", wca.EndpointApiMe, nil)
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", accessToken))
	client := http.Client{}
	res, err := client.Do(req)
	if err != nil {
		errors.SetError(c, "could not reach wca api", http.StatusInternalServerError)
		return ResponseAPIme{}, false
	}

	var parsedFinal ResponseAPIme
	if json.NewDecoder(res.Body).Decode(&parsedFinal) != nil {
		errors.SetError(c, "invalid response from wca api /me", http.StatusInternalServerError)
		return ResponseAPIme{}, false
	}
	return parsedFinal, true
}

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
	parsedFinal, ok := requestMe(c, parsedRes.AccessToken)
	if !ok {
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
		"accessToken": parsedRes.AccessToken,
		"expiresIn":   parsedRes.ExpiresIn,
		"name":        parsedFinal.Me.Name,
		"wcaId":       parsedFinal.Me.WCAid,
		"register": gin.H{
			"canRegister": parsedFinal.Me.Country == "BR",
			"stateId":     state,
			"updated":     lastUpdate,
		},
	})
}

func (gs *GlobalState) PostRegisterState(c *gin.Context) {
	// parsing body
	var input struct {
		AccessToken string `json:"accessToken"`
		WCAid       string `json:"wcaId"`
		StateID     string `json:"stateId"`
	}

	if json.NewDecoder(c.Request.Body).Decode(&input) != nil {
		errors.SetError(c, "invalid input", http.StatusBadRequest)
		return
	}

	// obtaining <me> information
	parsedMe, ok := requestMe(c, input.AccessToken)
	if !ok {
		return
	}

	if parsedMe.Me.WCAid != input.WCAid {
		errors.SetError(c, "wcaId does not match", http.StatusBadRequest)
		return
	}

	// 	db.Where(User{Name: "non_existing"}).Attrs(User{Email: "fake@fake.org"}).FirstOrInit(&user)
	// // user -> User{Name: "non_existing", Email: "fake@fake.org"}

	// fetching or registering
	var registeredUser models.RegisteredUser
	query := gs.DB.Where(
		models.RegisteredUser{WcaID: input.WCAid}).Take(&registeredUser)

	if query.Error != nil {
		if errs.Is(query.Error, gorm.ErrRecordNotFound) {
			// continue
		} else {
			errors.SetError(c, "could not reach database", http.StatusInternalServerError)
			return
		}
	} else {
		if time.Since(registeredUser.RegisterDate).Hours() < 24 {
			errors.SetError(c, "wait 24h before registering again", http.StatusTooEarly)
			return
		}
	}
	var insertErr error
	if registeredUser.WcaID != "" {
		insertErr = gs.DB.Model(&registeredUser).Updates(models.RegisteredUser{
			StateID:      input.StateID,
			RegisterDate: time.Now(),
		}).Error
	} else {
		registeredUser.StateID = input.StateID
		registeredUser.WcaID = input.WCAid
		registeredUser.RegisterDate = time.Now()
		insertErr = gs.DB.Create(&registeredUser).Error
	}

	if insertErr != nil {
		if errs.Is(insertErr, gorm.ErrForeignKeyViolated) {
			errors.SetError(c, "invalid state_id", http.StatusBadRequest)
		} else {
			errors.SetError(c, "could not update database", http.StatusInternalServerError)
		}
		return
	}

	c.AbortWithStatus(202)
}
