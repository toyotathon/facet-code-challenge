package repositories

import (
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/megaphone-sales-admin/models"
)

// ItemRepository struct
type ItemRepository struct {
	db *gorm.DB
}

// Init method
func (r *ItemRepository) Init(db *gorm.DB) {
	r.db = db
}

// CreateItem method
func (r *ItemRepository) CreateItem(item models.Item) models.Item {
	r.db.Where("description = ? AND price = ? AND merchant_id = ?", item.Description, item.Price, item.MerchantID).FirstOrCreate(&item)
	return item
}
