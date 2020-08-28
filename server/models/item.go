package models

// Item struct
type Item struct {
	ID          uint `json:"id" gorm:"primary_key"`
	Description string
	Price       int64
	MerchantID  uint `gorm:"TYPE:integer REFERENCES merchants"`
}
