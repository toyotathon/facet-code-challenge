package repositories

import (
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/facet-code-challenge/models"
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
func (r *FormRepository) CreateForm(formType models.FormType, name string, balance int64) error {
	form := models.Form{
		FormType: formType,
		Name:     name,
		Balance:  balance,
	}

	if err := r.db.Create(&form).Error; err != nil {
		return err
	}

	return nil
}

// GetAllForms method
func (r *FormRepository) GetAllForms() ([]models.Form, error) {
	var forms []models.Form
	if err := r.db.Find(&forms).Error; err != nil {
		return nil, err
	}
	return forms, nil
}

// DeleteForms method
func (r *FormRepository) DeleteForms(ids []int) error {
	if err := r.db.Delete(&models.Form{}, ids).Error; err != nil {
		return err
	}
	return nil
}
