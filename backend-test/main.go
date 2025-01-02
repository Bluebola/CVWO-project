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

}

func main() {
	database.ConnectDb()

	app := fiber.New()
	setupRoutes(app)

	log.Fatal(app.Listen(":3000"))

}
