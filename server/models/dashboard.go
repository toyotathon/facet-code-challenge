package models

// GetDashboardDataResponse struct
type GetDashboardDataResponse struct {
	TotalRevenue  float64 `json:"totalRevenue"`
	CustomerCount int     `json:"customerCount"`
}
