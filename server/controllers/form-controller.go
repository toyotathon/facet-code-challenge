package controllers

import (
	"net/http"

	"github.com/toyotathon/facet-code-challenge/models"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/facet-code-challenge/repositories"
)

// FormController struct
type FormController struct {
	formRepository *repositories.FormRepository
}

// Init method
func (r *FormController) Init(db *gorm.DB) {
	r.formRepository = &repositories.FormRepository{}
	r.formRepository.Init(db)
}

// CreateForm method
func (r *FormController) CreateForm(ctx *gin.Context) {
	var request models.CreateFormRequest
	err := ctx.BindJSON(&request)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}

	err = r.formRepository.CreateForm(request.FormType, request.Name, request.Balance)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}

	ctx.Status(http.StatusOK)
}

// DeleteForms method
func (r *FormController) DeleteForms(ctx *gin.Context) {
	var request models.DeleteFormRequest

	err := ctx.BindJSON(&request)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}

	err = r.formRepository.DeleteForms(request.FormIds)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}

	ctx.Status(http.StatusOK)
}
