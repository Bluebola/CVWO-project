package main

import (
	"log"

	"github.com/Bluebola/CVWO-project/backend/database"
	"github.com/Bluebola/CVWO-project/backend/routes"
	"github.com/gofiber/fiber/v2"
)

func welcome(c *fiber.Ctx) error {
	return c.SendString("Welcome to the backend-test API!")
}

func setupRoutes(app *fiber.App) {
	log.Println("Setting up routes")
	app.Get("/api", welcome)
	// Post endpoints
	app.Post("/api/post", routes.CreatePost)
	app.Get("/api/post", routes.GetPosts)
	app.Get("/api/post/:id", routes.GetPost)
	app.Put("/api/post/:id", routes.UpdatePost)
	app.Delete("/api/post/:id", routes.DeletePost)
	// User endpoints
	app.Post("api/user", routes.CreateUser)
	app.Get("api/user", routes.GetUsers)
	app.Get("api/user/:id", routes.GetUser)
	app.Put("api/user/:id", routes.UpdateUser)
	app.Delete("api/user/:id", routes.DeleteUser)
	//Comment endpoints
	app.Post("api/comment", routes.CreateComment)
	app.Get("api/comment", routes.GetComments)
	app.Put("api/comment/:id", routes.UpdateComment)
	app.Delete("api/comment/:id", routes.DeleteComment)

}

func main() {
	database.ConnectDb()

	app := fiber.New()
	setupRoutes(app)
	log.Fatal(app.Listen(":3000"))

}
