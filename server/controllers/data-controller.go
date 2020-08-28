package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/megaphone-sales-admin/models"
	"github.com/toyotathon/megaphone-sales-admin/repositories"
	"github.com/toyotathon/megaphone-sales-admin/utils"
)

// DataController struct
type DataController struct {
	uploadRepository *repositories.UploadRepository
}

// Init method
func (r *DataController) Init(db *gorm.DB) {
	r.uploadRepository = &repositories.UploadRepository{}
	r.uploadRepository.Init(db)
}

// GetAllUploadedData method
func (r *DataController) GetAllUploadedData(ctx *gin.Context) {
	var response []models.GetAllSalesDataResponse
	salesData := r.uploadRepository.GetAllSalesData()
	for _, data := range salesData {
		response = append(response, models.GetAllSalesDataResponse{
			ID:              data.ID,
			CustomerName:    data.CustomerName,
			ItemDescription: data.ItemDescription,
			ItemPrice:       utils.ConvertToUSDFloat(data.ItemPrice),
			MerchantAddress: data.MerchantAddress,
			MerchantName:    data.MerchantName,
			Quantity:        data.Quantity,
		})
	}
	ctx.JSON(http.StatusOK, response)
}
