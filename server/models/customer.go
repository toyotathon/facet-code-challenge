package models

// Customer struct
type Customer struct {
	ID   uint `json:"id" gorm:"primary_key"`
	Name string
}
