package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/toyotathon/facet-code-challenge/controllers"
	"github.com/toyotathon/facet-code-challenge/repositories"
)

func main() {
	r := gin.Default()
	repositories.ConnectDatabase()
	r.Use(static.Serve("/", static.LocalFile("./web", true)))
	api := r.Group("/api")

	dashboardController := controllers.DashboardController{}
	dashboardController.Init(repositories.DB)

	formController := controllers.FormController{}
	formController.Init(repositories.DB)

	// DashboardController endpoints
	api.GET("/dashboard", dashboardController.GetDashboardData)

	// FormController endpoints
	api.POST("/form", formController.CreateForm)
	api.DELETE("/form", formController.DeleteForms)

	r.Run()
}
