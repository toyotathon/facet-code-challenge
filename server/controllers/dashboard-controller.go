package controllers

import (
	"net/http"

	"github.com/toyotathon/megaphone-sales-admin/models"
	"github.com/toyotathon/megaphone-sales-admin/utils"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/megaphone-sales-admin/repositories"
)

// DashboardController struct
type DashboardController struct {
	customerRepository *repositories.CustomerRepository
	purchaseRepository *repositories.PurchaseRepository
}

// Init method
func (r *DashboardController) Init(db *gorm.DB) {
	r.customerRepository = &repositories.CustomerRepository{}
	r.customerRepository.Init(db)

	r.purchaseRepository = &repositories.PurchaseRepository{}
	r.purchaseRepository.Init(db)
}

// GetDashboardData method
func (r *DashboardController) GetDashboardData(ctx *gin.Context) {
	totalRevenue := r.purchaseRepository.GetTotalRevenue()
	customerCount := r.customerRepository.GetAllCustomers()

	ctx.JSON(http.StatusOK, models.GetDashboardDataResponse{
		TotalRevenue:  utils.ConvertToUSDFloat(totalRevenue),
		CustomerCount: len(customerCount),
	})
}
