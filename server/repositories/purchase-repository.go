package repositories

import (
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/megaphone-sales-admin/models"
	"github.com/toyotathon/megaphone-sales-admin/utils"
)

// PurchaseRepository struct
type PurchaseRepository struct {
	db *gorm.DB
}

// Init method
func (r *PurchaseRepository) Init(db *gorm.DB) {
	r.db = db
}

// CreatePurchase method
func (r *PurchaseRepository) CreatePurchase(purchase models.Purchase) models.Purchase {
	r.db.Create(&purchase)
	return purchase
}

// GetTotalRevenue method
func (r *PurchaseRepository) GetTotalRevenue() int64 {
	var purchases []models.Purchase
	var items []models.Item
	var totalRevenue int64
	r.db.Find(&purchases)
	r.db.Find(&items)
	for _, purchase := range purchases {
		item, _ := utils.FindItemByID(items, purchase.ItemID)
		totalRevenue += item.Price * purchase.Quantity
	}
	return totalRevenue
}
