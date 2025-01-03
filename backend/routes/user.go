package routes

import (
	"github.com/Bluebola/CVWO-project/backend/database"
	"github.com/Bluebola/CVWO-project/backend/models"
	"github.com/gofiber/fiber/v2"
)

// Create a new user endpoint
func CreateUser(c *fiber.Ctx) error {
	var user models.User
	// Parse the data to check if the payload is in the correct format.
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	// Check if the clerk_id already exists
	var existingUser models.User
	if err := database.Database.Db.Where("clerk_id = ?", user.ClerkID).First(&existingUser).Error; err == nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Clerk ID already exists",
		})
	}

	// Check if the email already exists
	if err := database.Database.Db.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Email already exists",
		})
	}

	// Save the user struct to the database
	// GORM automatically maps the models.User struct to the corresponding database table (e.g., users).
	if err := database.Database.Db.Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to create user",
		})
	}
	// This line sets the status code to 200 OK with c.Status(200) and sends the user data as JSON using .JSON(user).
	return c.Status(200).JSON(user)
}

// Returns a list of all users from our database.
func GetUsers(c *fiber.Ctx) error {
	// Creates an empty slice of the User model to prepare for data storage.
	users := []models.User{}
	// Queries the database for all users and preloads the Posts and Comments relationships.
	if err := database.Database.Db.Preload("Posts").Preload("Comments").Find(&users).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to retrieve users",
		})
	}

	// Count the number of comments associated with each post for each user
	for i := range users {
		for j := range users[i].Posts {
			var commentCount int64
			database.Database.Db.Model(&models.Comment{}).Where("post_id = ?", users[i].Posts[j].ID).Count(&commentCount)
			users[i].Posts[j].CommentCount = int(commentCount)
		}
	}

	// Returns the list of users as a JSON response with a status code of 200 OK.
	return c.Status(200).JSON(users)
}

// GetUser retrieves a single user by ID from our database.
func GetUser(c *fiber.Ctx) error {
	// Parses the ID parameter from the request URL.
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	var user models.User
	// Queries the database for a user with the specified ID and preloads the Posts and Comments relationships.
	if err := database.Database.Db.Preload("Posts").Preload("Comments").First(&user, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	// Count the number of comments associated with each post for the user
	for i := range user.Posts {
		var commentCount int64
		database.Database.Db.Model(&models.Comment{}).Where("post_id = ?", user.Posts[i].ID).Count(&commentCount)
		user.Posts[i].CommentCount = int(commentCount)
	}

	// Returns the user as a JSON response with a status code of 200 OK.
	return c.Status(200).JSON(user)
}

// Updates a user by ID in our database.
func UpdateUser(c *fiber.Ctx) error {
	// Parses the ID parameter from the request URL.
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	var user models.User
	// Queries the database for a user with the specified ID.
	if err := database.Database.Db.First(&user, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	// Define a struct to hold the updated user data from the request body.
	type UpdateUser struct {
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
	}

	var updateData UpdateUser
	// Parses the request body to extract the updated user data.
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(500).JSON(err.Error())
	}

	// Updates the user variable with the new values from the request body.
	user.FirstName = updateData.FirstName
	user.LastName = updateData.LastName

	// Updates the user data in the database with the new values.
	if err := database.Database.Db.Save(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to update user",
		})
	}

	// Returns the updated user as a JSON response with a status code of 200 OK.
	return c.Status(200).JSON(user)
}

// Deletes a user by ID from our database.
func DeleteUser(c *fiber.Ctx) error {
	// Parses the ID parameter from the request URL.
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	var user models.User
	// Queries the database for a user with the specified ID.
	if err := database.Database.Db.First(&user, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	// Deletes the user from the database.
	if err := database.Database.Db.Delete(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to delete user",
		})
	}

	// Returns a success message as a JSON response with a status code of 200 OK.
	return c.Status(200).JSON(fiber.Map{
		"message": "Successfully deleted user",
	})
}
