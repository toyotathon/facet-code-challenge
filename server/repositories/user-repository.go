package repositories

import (
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/megaphone-sales-admin/models"
	"github.com/toyotathon/megaphone-sales-admin/utils"
)

// UserRepository struct
type UserRepository struct {
	db *gorm.DB
}

// Init method
func (r *UserRepository) Init(db *gorm.DB) {
	r.db = db
}

// CreateUser method
func (r *UserRepository) CreateUser(username string, name string, password string) models.User {
	user := models.User{
		UserName: username,
		Name:     name,
		Password: utils.HashPassword(password),
	}
	r.db.Create(&user)
	return user
}

// GetUserByUserName method
func (r *UserRepository) GetUserByUserName(username string) (models.User, error) {
	var user models.User
	if err := r.db.Where("user_name = ?", username).Find(&user).Error; err != nil {
		return models.User{}, err
	}
	return user, nil
}
