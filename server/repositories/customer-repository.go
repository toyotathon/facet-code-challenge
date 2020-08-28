package repositories

import (
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/megaphone-sales-admin/models"
)

// CustomerRepository struct
type CustomerRepository struct {
	db *gorm.DB
}

// Init method
func (r *CustomerRepository) Init(db *gorm.DB) {
	r.db = db
}

// CreateCustomer method
func (r *CustomerRepository) CreateCustomer(customer models.Customer) models.Customer {
	r.db.Where("name = ?", customer.Name).FirstOrCreate(&customer)
	return customer
}

// GetAllCustomers method
func (r *CustomerRepository) GetAllCustomers() []models.Customer {
	var customers []models.Customer
	r.db.Find(&customers)
	return customers
}
