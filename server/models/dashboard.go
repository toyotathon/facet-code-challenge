package models

// GetDashboardDataResponse struct
type GetDashboardDataResponse struct {
	TotalRevenue     float64 `json:"totalRevenue"`
	CustomerCount    int     `json:"customerCount"`
	NetWorth         float64 `json:"netWorth"`
	AssetsTotal      int     `json:"assetsTotal"`
	LiabilitiesTotal int     `json:"liabilitiesTotal"`
}
