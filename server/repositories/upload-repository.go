package repositories

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/toyotathon/megaphone-sales-admin/models"
	"github.com/toyotathon/megaphone-sales-admin/utils"
)

// UploadRepository struct
type UploadRepository struct {
	db *gorm.DB
}

// Init method
func (r *UploadRepository) Init(db *gorm.DB) {
	r.db = db
}

// GetAllSalesData method
func (r *UploadRepository) GetAllSalesData() []models.SalesData {
	var salesData []models.SalesData
	r.db.Find(&salesData)

	return salesData
}

// SaveSalesData method
func (r *UploadRepository) SaveSalesData(file multipart.File, ctx *gin.Context) []models.SalesData {
	reader := csv.NewReader(bufio.NewReader(file))
	// Skip reading first row
	reader.Read()
	var salesData []models.SalesData
	for {
		line, error := reader.Read()
		if error == io.EOF {
			break
		} else if error != nil {
			ctx.String(http.StatusBadRequest, fmt.Sprintf("Read Error: %s", error.Error()))
		}
		itemPrice, err := strconv.ParseFloat(line[2], 64)
		if err != nil {
			ctx.String(http.StatusBadRequest, fmt.Sprintf("Error reading item price: %s", error.Error()))
		}

		quantity, err := strconv.ParseInt(line[3], 10, 64)
		if err != nil {
			ctx.String(http.StatusBadRequest, fmt.Sprintf("Error reading quantity: %s", error.Error()))
		}

		data := models.SalesData{
			CustomerName:    line[0],
			ItemDescription: line[1],
			ItemPrice:       utils.ConvertToUSDInt(itemPrice),
			Quantity:        quantity,
			MerchantName:    line[4],
			MerchantAddress: line[5],
		}
		r.db.Create(&data)
		salesData = append(salesData, data)
	}
	return salesData
}
