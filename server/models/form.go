package models

// FormType type
type FormType string

// FormType consts
const (
	Asset     FormType = "Asset"
	Liability FormType = "Liability"
)

// Form struct
type Form struct {
	ID       uint     `json:"id" gorm:"primary_key"`
	FormType FormType `json:"formType"`
	Name     string   `json:"name"`
	Balance  int64    `json:"balance"`
}
