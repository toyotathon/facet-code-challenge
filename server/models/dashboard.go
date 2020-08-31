package models

// FormData struct
type FormData struct {
	ID       uint     `json:"id" gorm:"primary_key"`
	FormType FormType `json:"formType"`
	Name     string   `json:"name"`
	Balance  float64  `json:"balance"`
}

// GetDashboardDataResponse struct
type GetDashboardDataResponse struct {
	NetWorth         float64    `json:"netWorth"`
	TotalAssets      float64    `json:"totalAssets"`
	TotalLiabilities float64    `json:"totalLiabilities"`
	FormData         []FormData `json:"formData"`
}
