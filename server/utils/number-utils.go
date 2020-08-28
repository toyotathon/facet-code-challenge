package utils

// ConvertToUSDInt method
func ConvertToUSDInt(f float64) int64 {
	value := int64((f * 100) + 0.5)
	return value
}

// ConvertToUSDFloat method
func ConvertToUSDFloat(i int64) float64 {
	f := float64(i)
	f = f / 100
	return f
}
