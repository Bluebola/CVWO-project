package routes

import (
	"github.com/Bluebola/CVWO-project/backend-test/database"
	"github.com/Bluebola/CVWO-project/backend-test/models"
	"github.com/gofiber/fiber/v2"
)

// Serializer Struct: The User struct in the routes package includes only the fields
// that should be exposed in API responses, ensuring sensitive information is not leaked.
type UserSerialiazer struct {
	// this is not the model User, see this as the serializer.
	ID        uint   `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

// This function takes in the user model and returns a User struct with the same data as specified in the serializer.
// In the CreateResponseUser function, the type of the user argument is models.User, which is the model struct used for database operations.
// The function returns a User type from the routes package, which is the serializer struct used for API responses.
func CreateResponseUser(userModel models.User) UserSerialiazer {
	return UserSerialiazer{
		ID:        userModel.ID,
		FirstName: userModel.FirstName,
		LastName:  userModel.LastName,
	}
}

// Create a new user endpoint
func CreateUser(c *fiber.Ctx) error {
	var user models.User

	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	database.Database.Db.Create(&user)
	responseUser := CreateResponseUser(user)
	return c.Status(200).JSON(responseUser)
}
