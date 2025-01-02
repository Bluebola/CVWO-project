package routes

import (
	"errors"

	"github.com/Bluebola/CVWO-project/backend-test/database"
	"github.com/Bluebola/CVWO-project/backend-test/models"
	"github.com/gofiber/fiber/v2"
)

type Product struct {
	// This is not the model, more like a serializer
	ID           uint   `json:"id"`
	Name         string `json:"name"`
	SerialNumber string `json:"serial_number"`
}

func CreateResponseProduct(product models.Product) Product {
	return Product{ID: product.ID,
		Name:         product.Name,
		SerialNumber: product.SerialNumber}
}

// CreateProduct function creates a new product in the database.
func CreateProduct(c *fiber.Ctx) error {
	// Create a new product struct
	var product models.Product
	// Parse the data to check if the payload is in the correct format.
	if err := c.BodyParser(&product); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	database.Database.Db.Create(&product)
	responseProduct := CreateResponseProduct(product)
	return c.Status(200).JSON(responseProduct)
}

// (s) plurals use slice.
func GetProducts(c *fiber.Ctx) error {
	// Create an empty slice of the Product model to prepare for data storage.
	products := []models.Product{}
	// Queries the database for all products and stores the result in the products slice.
	database.Database.Db.Find(&products)
	responseProducts := []Product{}
	for _, product := range products {
		responseProduct := CreateResponseProduct(product)
		responseProducts = append(responseProducts, responseProduct)
	}

	return c.Status(200).JSON(responseProducts)
}

func findProduct(id int, product *models.Product) error {
	database.Database.Db.Find(&product, "id = ?", id)
	if product.ID == 0 {
		return errors.New("product does not exist")
	}
	return nil
}

func GetProduct(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	var product models.Product

	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	if err := findProduct(id, &product); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	responseProduct := CreateResponseProduct(product)

	return c.Status(200).JSON(responseProduct)
}

func UpdateProduct(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	var product models.Product

	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	err = findProduct(id, &product)

	if err != nil {
		return c.Status(400).JSON(err.Error())
	}

	type UpdateProduct struct {
		Name         string `json:"name"`
		SerialNumber string `json:"serial_number"`
	}

	var updateData UpdateProduct

	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(500).JSON(err.Error())
	}

	product.Name = updateData.Name
	product.SerialNumber = updateData.SerialNumber

	database.Database.Db.Save(&product)

	responseProduct := CreateResponseProduct(product)

	return c.Status(200).JSON(responseProduct)
}

func DeleteProduct(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	var product models.Product

	err = findProduct(id, &product)

	if err != nil {
		return c.Status(400).JSON(err.Error())
	}

	database.Database.Db.Delete(&product)

	responseProduct := CreateResponseProduct(product)
	return c.Status(200).JSON(fiber.Map{
		"message": "Product deleted successfully",
		"product": responseProduct,
	})
}
