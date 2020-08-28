package repositories

import (
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/megaphone-sales-admin/models"
)

// FormRepository struct
type FormRepository struct {
	db *gorm.DB
}

// Init method
func (r *FormRepository) Init(db *gorm.DB) {
	r.db = db
}

// CreateForm method
func (r *FormRepository) CreateForm(item models.Form) {

}
