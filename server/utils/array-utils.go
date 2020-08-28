package utils

import (
	"errors"

	"github.com/toyotathon/megaphone-sales-admin/models"
)

// FindItemByID method
func FindItemByID(items []models.Item, id uint) (models.Item, error) {
	for _, item := range items {
		if item.ID == id {
			return item, nil
		}
	}
	return models.Item{}, errors.New("Item was not found")
}
