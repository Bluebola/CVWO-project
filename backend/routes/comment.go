package routes

import (
	"github.com/Bluebola/CVWO-project/backend/database"
	"github.com/Bluebola/CVWO-project/backend/models"
	"github.com/gofiber/fiber/v2"
)

// CreateComment creates a new comment in the database.
func CreateComment(c *fiber.Ctx) error {
	var comment models.Comment

	// Parse the request body into the comment struct
	if err := c.BodyParser(&comment); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	var user models.User
	// Find the user with the ID specified in the comment
	if err := database.Database.Db.First(&user, comment.UserID).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "User not found. You need to enter a valid user ID to create the comment.",
		})
	}

	var post models.Post
	// Find the post with the ID specified in the comment
	if err := database.Database.Db.First(&post, comment.PostID).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Post not found. You need to enter a valid post ID to create the comment.",
		})
	}

	// Create the comment in the database
	if err := database.Database.Db.Create(&comment).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to create comment",
		})
	}

	// Return the created comment
	return c.Status(200).JSON(comment)
}

// GetComments retrieves all comments from our database.
func GetComments(c *fiber.Ctx) error {
	var comments []models.Comment

	// Find all comments in the database
	if err := database.Database.Db.Find(&comments).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to retrieve comments",
		})
	}

	return c.Status(200).JSON(comments)
}

// UpdateComment updates a comment by ID in our database.
func UpdateComment(c *fiber.Ctx) error {
	// Parses the ID parameter from the request URL.
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	var comment models.Comment
	// Queries the database for a comment with the specified ID.
	if err := database.Database.Db.First(&comment, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "Comment not found",
		})
	}

	// Define a struct to hold the updated comment data from the request body.
	type UpdateComment struct {
		Content string `json:"content"`
	}

	var updateData UpdateComment
	// Parses the request body to extract the updated comment data.
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(500).JSON(err.Error())
	}

	// Updates the comment variable with the new values from the request body.
	comment.Content = updateData.Content

	// Updates the comment data in the database with the new values.
	if err := database.Database.Db.Save(&comment).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to update comment",
		})
	}

	// Returns the updated comment as a JSON response with a status code of 200 OK.
	return c.Status(200).JSON(comment)
}

// DeleteComment deletes a comment by ID from our database.
func DeleteComment(c *fiber.Ctx) error {
	// Parses the ID parameter from the request URL.
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	var comment models.Comment
	// Queries the database for a comment with the specified ID.
	if err := database.Database.Db.First(&comment, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "Comment not found",
		})
	}

	// Deletes the comment from the database.
	if err := database.Database.Db.Delete(&comment).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to delete comment",
		})
	}

	// Returns a success message as a JSON response with a status code of 200 OK.
	return c.Status(200).JSON(fiber.Map{
		"message": "Successfully deleted comment",
	})
}
