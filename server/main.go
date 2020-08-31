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
	auth := r.Group("/auth")
	api := r.Group("/api")

	authController := controllers.AuthController{}
	authController.Init(repositories.DB)
	authMiddleware := authController.CreateJWTMiddleware()

	dashboardController := controllers.DashboardController{}
	dashboardController.Init(repositories.DB)

	formController := controllers.FormController{}
	formController.Init(repositories.DB)

	userController := controllers.UserController{}
	userController.Init(repositories.DB)

	// Auth endpoints
	auth.POST("/login", authMiddleware.LoginHandler)
	auth.GET("/logout", authMiddleware.LogoutHandler)
	auth.GET("/refresh-token", authMiddleware.RefreshHandler)

	// TODO: readd auth middleware once it is fully implemented
	// DashboardController endpoints
	api.GET("/dashboard", dashboardController.GetDashboardData)

	// FormController endpoints
	api.POST("/form", formController.CreateForm)
	api.DELETE("/form", formController.DeleteForms)

	// UserController endpoints
	api.POST("/user", userController.CreateNewUser)

	r.Run()
}
