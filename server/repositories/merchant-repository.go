package repositories

import (
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/megaphone-sales-admin/models"
)

// MerchantRepository struct
type MerchantRepository struct {
	db *gorm.DB
}

// Init method
func (r *MerchantRepository) Init(db *gorm.DB) {
	r.db = db
}

// CreateMerchant method
func (r *MerchantRepository) CreateMerchant(merchant models.Merchant) models.Merchant {
	r.db.Where("name = ? AND address = ?", merchant.Name, merchant.Address).FirstOrCreate(&merchant)
	return merchant
}
