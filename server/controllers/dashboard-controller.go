package controllers

import (
	"net/http"

	"github.com/toyotathon/facet-code-challenge/utils"

	"github.com/toyotathon/facet-code-challenge/models"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/facet-code-challenge/repositories"
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
	forms, err := r.formRepository.GetAllForms()

	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}

	var netWorth, totalAssets, totalLiabilities int64 = 0, 0, 0
	formData := []models.FormData{}
	for _, form := range forms {
		switch formType := form.FormType; formType {
		case models.Asset:
			totalAssets += form.Balance
			netWorth += form.Balance
		case models.Liability:
			totalLiabilities += form.Balance
			netWorth -= form.Balance
		}

		formData = append(formData, models.FormData{
			ID:       form.ID,
			Balance:  utils.ConvertToUSDFloat(form.Balance),
			Name:     form.Name,
			FormType: form.FormType,
		})
	}

	ctx.JSON(http.StatusOK, models.GetDashboardDataResponse{
		NetWorth:         utils.ConvertToUSDFloat(netWorth),
		TotalAssets:      utils.ConvertToUSDFloat(totalAssets),
		TotalLiabilities: utils.ConvertToUSDFloat(totalLiabilities),
		FormData:         formData,
	})
}
