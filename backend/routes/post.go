package routes

import (
	"github.com/Bluebola/CVWO-project/backend/database"
	"github.com/Bluebola/CVWO-project/backend/models"
	"github.com/gofiber/fiber/v2"
)

// PostSerializer is used for API responses and includes only the fields that should be exposed to the client.

// CreatePost creates a new post in the database.
func CreatePost(c *fiber.Ctx) error {
	var post models.Post

	// Parse the request body into the post struct
	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	var user models.User
	// Find the user with the ID specified in the post
	if err := database.Database.Db.First(&user, post.UserID).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "User not found. You need to enter a valid user ID to create the post.",
		})
	}

	// Create the post in the database
	if err := database.Database.Db.Create(&post).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to create post",
		})
	}

	// Return the created post
	return c.Status(200).JSON(post)
}

// GetPost retrieves a single post by ID from our database.
func GetPost(c *fiber.Ctx) error {
	// Parses the ID parameter from the request URL.
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	var post models.Post
	// Queries the database for a post with the specified ID.
	if err := database.Database.Db.First(&post, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "Post not found",
		})
	}

	// Count the number of comments associated with the post
	var commentCount int64
	database.Database.Db.Model(&models.Comment{}).Where("post_id = ?", post.ID).Count(&commentCount)
	post.CommentCount = int(commentCount)

	// Returns the post as a JSON response with a status code of 200 OK.
	return c.Status(200).JSON(post)
}

// GetPosts retrieves all posts from our database.
func GetPosts(c *fiber.Ctx) error {
	var posts []models.Post

	// Find all posts in the database
	if err := database.Database.Db.Find(&posts).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to retrieve posts",
		})
	}

	// Count the number of comments associated with each post
	for i := range posts {
		var commentCount int64
		database.Database.Db.Model(&models.Comment{}).Where("post_id = ?", posts[i].ID).Count(&commentCount)
		posts[i].CommentCount = int(commentCount)
	}

	return c.Status(200).JSON(posts)
}

// UpdatePost updates a post by ID in our database.
func UpdatePost(c *fiber.Ctx) error {
	// Parses the ID parameter from the request URL.
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	var post models.Post
	// Queries the database for a post with the specified ID.
	if err := database.Database.Db.First(&post, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "Post not found",
		})
	}

	// Define a struct to hold the updated post data from the request body.
	type UpdatePost struct {
		Title    string `json:"title"`
		Content  string `json:"content"`
		Category string `json:"category"`
	}

	var updateData UpdatePost
	// Parses the request body to extract the updated post data.
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(500).JSON(err.Error())
	}

	// Updates the post variable with the new values from the request body.
	post.Title = updateData.Title
	post.Content = updateData.Content
	post.Category = updateData.Category

	// Updates the post data in the database with the new values.
	if err := database.Database.Db.Save(&post).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to update post",
		})
	}

	// Returns the updated post as a JSON response with a status code of 200 OK.
	return c.Status(200).JSON(post)
}

// DeletePost deletes a post by ID from our database.
func DeletePost(c *fiber.Ctx) error {
	// Parses the ID parameter from the request URL.
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	var post models.Post
	// Queries the database for a post with the specified ID.
	if err := database.Database.Db.First(&post, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "Post not found",
		})
	}

	// Deletes the post from the database.
	if err := database.Database.Db.Delete(&post).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to delete post",
		})
	}

	// Returns a success message as a JSON response with a status code of 200 OK.
	return c.Status(200).JSON(fiber.Map{
		"message": "Successfully deleted post",
	})
}
