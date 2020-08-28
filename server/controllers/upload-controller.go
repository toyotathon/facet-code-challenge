package controllers

import (
	"fmt"
	"net/http"

	"github.com/toyotathon/megaphone-sales-admin/models"

	"github.com/jinzhu/gorm"
	"github.com/toyotathon/megaphone-sales-admin/repositories"

	"github.com/gin-gonic/gin"
)

// UploadController struct
type UploadController struct {
	customerRepository *repositories.CustomerRepository
	itemRepository     *repositories.ItemRepository
	merchantRepository *repositories.MerchantRepository
	purchaseRepository *repositories.PurchaseRepository
	uploadRepository   *repositories.UploadRepository
}

// Init method
func (r *UploadController) Init(db *gorm.DB) {
	r.customerRepository = &repositories.CustomerRepository{}
	r.customerRepository.Init(db)

	r.itemRepository = &repositories.ItemRepository{}
	r.itemRepository.Init(db)

	r.merchantRepository = &repositories.MerchantRepository{}
	r.merchantRepository.Init(db)

	r.purchaseRepository = &repositories.PurchaseRepository{}
	r.purchaseRepository.Init(db)

	r.uploadRepository = &repositories.UploadRepository{}
	r.uploadRepository.Init(db)
}

// UploadForm method
func (r *UploadController) UploadForm(ctx *gin.Context) {
	file, _, err := ctx.Request.FormFile("file")
	if err != nil {
		ctx.String(http.StatusBadRequest, fmt.Sprintf("File Error: %s", err.Error()))
		return
	}
	defer file.Close()
	salesData := r.uploadRepository.SaveSalesData(file, ctx)

	for _, data := range salesData {
		merchant := r.merchantRepository.CreateMerchant(models.Merchant{Name: data.MerchantName, Address: data.MerchantAddress})
		customer := r.customerRepository.CreateCustomer(models.Customer{Name: data.CustomerName})
		item := r.itemRepository.CreateItem(models.Item{
			Description: data.ItemDescription,
			Price:       data.ItemPrice,
			MerchantID:  merchant.ID,
		})
		r.purchaseRepository.CreatePurchase(models.Purchase{
			MerchantID: merchant.ID,
			CustomerID: customer.ID,
			ItemID:     item.ID,
			Quantity:   data.Quantity,
		})
	}
}
