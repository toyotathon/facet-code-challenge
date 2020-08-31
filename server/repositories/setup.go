package repositories

import (
	"log"
	"os"

	"github.com/toyotathon/facet-code-challenge/models"

	"github.com/jinzhu/gorm"
	// GORM Postgres Dialect
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// DB var
var DB *gorm.DB

// ConnectDatabase method
func ConnectDatabase() {
	dbURL := os.Getenv("DATABASE_URL")
	database, err := gorm.Open("postgres", dbURL)

	if err != nil {
		log.Printf("%v", err)
		panic("Failed to connect to database.")
	}

	database.AutoMigrate(&models.User{})
	database.AutoMigrate(&models.Form{})

	DB = database
}
