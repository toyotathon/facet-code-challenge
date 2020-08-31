package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/facet-code-challenge/models"
	"github.com/toyotathon/facet-code-challenge/repositories"
)

// UserController struct
type UserController struct {
	userRepository *repositories.UserRepository
}

// Init method
func (r *UserController) Init(db *gorm.DB) {
	r.userRepository = &repositories.UserRepository{}
	r.userRepository.Init(db)
}

// CreateNewUser method
func (r *UserController) CreateNewUser(ctx *gin.Context) {
	var request models.CreateNewUserRequest
	err := ctx.BindJSON(&request)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
	}
	user := r.userRepository.CreateUser(request.UserName, request.Name, request.Password)
	ctx.JSON(http.StatusOK, user)
}
