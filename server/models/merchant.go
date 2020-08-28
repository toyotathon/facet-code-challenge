package models

// Merchant struct
type Merchant struct {
	ID      uint `json:"id" gorm:"primary_key"`
	Name    string
	Address string
}
