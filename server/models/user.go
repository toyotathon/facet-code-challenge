package models

// User struct
type User struct {
	ID       uint   `json:"id" gorm:"primary_key"`
	UserName string `json:"userName" gorm:"unique;not null"`
	Name     string `json:"name"`
	Password string `json:"password"`
}
