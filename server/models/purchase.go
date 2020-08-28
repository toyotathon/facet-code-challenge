package models

// Purchase struct
type Purchase struct {
	ID         uint  `json:"id" gorm:"primary_key"`
	MerchantID uint  `gorm:"TYPE:integer REFERENCES merchants"`
	CustomerID uint  `gorm:"TYPE:integer REFERENCES customers"`
	ItemID     uint  `gorm:"TYPE:integer REFERENCES items"`
	Quantity   int64 `gorm:"foreignkey:ID"`
}
