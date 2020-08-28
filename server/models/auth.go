package models

// LoginRequest struct
type LoginRequest struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
}

// CreateNewUserRequest struct
type CreateNewUserRequest struct {
	UserName string `json:"userName"`
	Name     string `json:"name"`
	Password string `json:"password"`
}

// User struct
type User struct {
	ID       uint   `json:"id" gorm:"primary_key"`
	UserName string `json:"userName" gorm:"unique;not null"`
	Name     string `json:"name"`
	Password string `json:"password"`
}
