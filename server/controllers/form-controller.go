package controllers

import (
	"net/http"

	"github.com/toyotathon/megaphone-sales-admin/models"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/megaphone-sales-admin/repositories"
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

// UploadForm method
func (r *FormController) UploadForm(ctx *gin.Context) {
	// TODO
	var response models.Form
	ctx.JSON(http.StatusOK, response)
}
