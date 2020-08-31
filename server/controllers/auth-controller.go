package controllers

import (
	"time"

	"github.com/toyotathon/facet-code-challenge/utils"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/facet-code-challenge/models"
	"github.com/toyotathon/facet-code-challenge/repositories"
)

// AuthController struct
type AuthController struct {
	userRepository *repositories.UserRepository
}

// Init method
func (r *AuthController) Init(db *gorm.DB) {
	r.userRepository = &repositories.UserRepository{}
	r.userRepository.Init(db)
}

// CreateJWTMiddleware method
func (r *AuthController) CreateJWTMiddleware() *jwt.GinJWTMiddleware {
	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:      "dev",
		Key:        []byte("secret key"),
		Timeout:    time.Hour,
		MaxRefresh: time.Hour,
		Authenticator: func(ctx *gin.Context) (interface{}, error) {
			var login models.LoginRequest
			if err := ctx.ShouldBind(&login); err != nil {
				return "", jwt.ErrMissingLoginValues
			}
			userName := login.UserName
			password := login.Password

			user, err := r.userRepository.GetUserByUserName(userName)
			if err != nil {
				return nil, jwt.ErrFailedAuthentication
			}

			if (userName == user.UserName) && (utils.CheckPasswordHash(password, user.Password)) {
				return &models.User{
					ID:       user.ID,
					Name:     user.Name,
					UserName: user.UserName,
				}, nil
			}
			return nil, jwt.ErrFailedAuthentication
		},
		Unauthorized: func(ctx *gin.Context, code int, message string) {
			ctx.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		TokenLookup:  "cookie: token",
		CookieName:   "token",
		TimeFunc:     time.Now,
		SendCookie:   true,
		SecureCookie: false,
	})

	if err != nil {
		panic("Error setting up JWT middleware.")
	}

	return authMiddleware
}
