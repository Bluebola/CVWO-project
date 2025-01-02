package main

import (
	"log"

	"github.com/Bluebola/CVWO-project/backend-test/database"
	"github.com/Bluebola/CVWO-project/backend-test/routes"
	"github.com/gofiber/fiber/v2"
)

func welcome(c *fiber.Ctx) error {
	return c.SendString("Welcome to the backend-test API!")
}

func setupRoutes(app *fiber.App) {
	// Welcome endpoint
	app.Get("/api", welcome)
	// User endpoints
	app.Post("/api/users", routes.CreateUser)
	app.Get("/api/users", routes.GetUsers)
	app.Get("/api/users/:id", routes.GetUser)
	app.Put("/api/users/:id", routes.UpdateUser)
	app.Delete("/api/users/:id", routes.DeleteUser)
	// Product endpoints
	app.Post("/api/products", routes.CreateProduct)
	app.Get("/api/products", routes.GetProducts)
	app.Get("/api/products/:id", routes.GetProduct)
	app.Put("/api/products/:id", routes.UpdateProduct)
	app.Delete("/api/products/:id", routes.DeleteProduct)
	// Order endpoints
	app.Post("/api/orders", routes.CreateOrder)
	app.Get("/api/orders", routes.GetOrders)
	app.Get("/api/orders/:id", routes.GetOrder)
	// app.Put("/api/orders/:id", routes.UpdateOrder)
	// app.Delete("/api/orders/:id", routes.DeleteOrder)

}

func main() {
	database.ConnectDb()

	app := fiber.New()
	setupRoutes(app)

	log.Fatal(app.Listen(":3000"))

}
