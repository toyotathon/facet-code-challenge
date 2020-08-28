package controllers

import (
	"net/http"

	"github.com/toyotathon/megaphone-sales-admin/models"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/megaphone-sales-admin/repositories"
)

// DashboardController struct
type DashboardController struct {
	formRepository *repositories.FormRepository
}

// Init method
func (r *DashboardController) Init(db *gorm.DB) {
	r.formRepository = &repositories.FormRepository{}
	r.formRepository.Init(db)
}

// GetDashboardData method
func (r *DashboardController) GetDashboardData(ctx *gin.Context) {
	// TODO
	// totalRevenue := r.purchaseRepository.GetTotalRevenue()
	// customerCount := r.customerRepository.GetAllCustomers()

	ctx.JSON(http.StatusOK, models.GetDashboardDataResponse{})
}
