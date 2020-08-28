package models

// SalesData struct
type SalesData struct {
	ID              uint   `json:"id" gorm:"primary_key"`
	CustomerName    string `json:"customerName"`
	ItemDescription string `json:"itemDescription"`
	ItemPrice       int64  `json:"itemPrice"`
	MerchantAddress string `json:"merchantAddress"`
	MerchantName    string `json:"merchantName"`
	Quantity        int64  `json:"quantity"`
}

// GetAllSalesDataResponse struct
type GetAllSalesDataResponse struct {
	ID              uint    `json:"id"`
	CustomerName    string  `json:"customerName"`
	ItemDescription string  `json:"itemDescription"`
	ItemPrice       float64 `json:"itemPrice"`
	MerchantAddress string  `json:"merchantAddress"`
	MerchantName    string  `json:"merchantName"`
	Quantity        int64   `json:"quantity"`
}
