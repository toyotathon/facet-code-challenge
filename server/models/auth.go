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
