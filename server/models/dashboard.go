package models

// GetDashboardDataResponse struct
type GetDashboardDataResponse struct {
	NetWorth         float64 `json:"netWorth"`
	TotalAssets      float64 `json:"assetsTotal"`
	TotalLiabilities float64 `json:"liabilitiesTotal"`
	FormData         []Form  `json:"formData"`
}
