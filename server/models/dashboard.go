package models

// GetDashboardDataResponse struct
type GetDashboardDataResponse struct {
	NetWorth         float64 `json:"netWorth"`
	TotalAssets      float64 `json:"totalAssets"`
	TotalLiabilities float64 `json:"totalLiabilities"`
	FormData         []Form  `json:"formData"`
}
