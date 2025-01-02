package routes

import (
	"errors"

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

	//Parse the data to check if the payload is in the correct format.
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(err.Error())
	}
	// Save the user struct to the database
	// GORM automatically maps the models.User struct to the corresponding database table (e.g., users).
	database.Database.Db.Create(&user)
	// This method formats the user data for the API response.
	responseUser := CreateResponseUser(user)
	// This line sets the status code to 200 OK with c.Status(200) and sends the formatted user data as JSON using .JSON(responseUser).
	return c.Status(200).JSON(responseUser)
}

// Returns a list of all users from our database.
func GetUsers(c *fiber.Ctx) error {
	// Creates an empty slice of the User model to prepare for data storage.
	users := []models.User{}
	// Queries the database for all users and stores the result in the users slice.
	database.Database.Db.Find(&users)
	// Declares a slice to hold the serialized version of each user.
	responseUsers := []UserSerialiazer{}
	// Iterates over each user in the users slice, serializes the user data, and appends it to the responseUsers slice.
	for _, user := range users {
		responseUser := CreateResponseUser(user)
		responseUsers = append(responseUsers, responseUser)

	}
	// Returns the list of users as a JSON response with a status code of 200 OK.
	return c.Status(200).JSON(responseUsers)
}

// This function takes in the user model and returns a User struct with the same data as specified in the serializer.
func findUser(id int, user *models.User) error {
	// Queries the database for a user with the specified ID and stores the result in the user struct.
	database.Database.Db.Find(&user, "id = ?", id)
	// Checks if the user ID is 0, indicating that the user does not exist.
	if user.ID == 0 {
		// Returns an error message if the user does not exist.
		return errors.New("user does not exist")
	}
	// Returns nil if the user exists.
	return nil
}

// This function takes in the user model and returns a User struct with the same data as specified in the serializer.
func GetUser(c *fiber.Ctx) error {
	// Parses the ID parameter from the request URL.
	id, err := c.ParamsInt("id")

	var user models.User

	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}
	// Calls the findUser function to retrieve the user with the specified ID.
	if err := findUser(id, &user); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	responseUser := CreateResponseUser(user)

	return c.Status(200).JSON(responseUser)
}

func UpdateUser(c *fiber.Ctx) error {
	// Parses the ID parameter from the request URL.
	id, err := c.ParamsInt("id")

	var user models.User

	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	err = findUser(id, &user)

	if err != nil {
		return c.Status(400).JSON(err.Error())
	}
	// Define a struct to hold the updated user data from the request body.
	type UpdateUser struct {
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
	}

	var updateData UpdateUser
	// Parses the request body to extract the updated user data. (checks data format and puts it into user variable.)
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(500).JSON(err.Error())
	}
	// Updates the user variable with the new values from the request body.
	user.FirstName = updateData.FirstName
	user.LastName = updateData.LastName

	// Updates the user data in the database with the new values.
	database.Database.Db.Save(&user)

	responseUser := CreateResponseUser(user)

	return c.Status(200).JSON(responseUser)

}

func DeleteUser(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	var user models.User

	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}
	// Calls the findUser function to retrieve the user with the specified ID.
	err = findUser(id, &user)

	if err != nil {
		return c.Status(400).JSON(err.Error())
	}

	if err = database.Database.Db.Delete(&user).Error; err != nil {
		return c.Status(404).JSON(err.Error())
	}
	return c.Status(200).JSON("Successfully deleted User")
}
