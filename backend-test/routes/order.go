package routes

import (
	"errors"
	"time"

	"github.com/Bluebola/CVWO-project/backend-test/database"
	"github.com/Bluebola/CVWO-project/backend-test/models"
	"github.com/gofiber/fiber/v2"
)

// This struct is used for API responses and includes only the fields that should be exposed to the client.
type Order struct {
	ID        uint            `json:"id"`
	User      UserSerialiazer `json:"user"`
	Product   Product         `json:"product"`
	CreatedAt time.Time
}

// This function takes in the user model and returns a User struct with the same data as specified in the serializer.
func CreateResponseOrder(order models.Order, user UserSerialiazer, product Product) Order {
	return Order{ID: order.ID, User: user, Product: product}
}

func CreateOrder(c *fiber.Ctx) error {
	var order models.Order

	if err := c.BodyParser(&order); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	var user models.User
	// Find the user with the ID specified in the order
	err := findUser(order.UserRefer, &user)
	if err != nil {
		return c.Status(400).JSON(err.Error())
	}

	var product models.Product

	if err := findProduct(order.ProductRefer, &product); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	database.Database.Db.Create(&order)

	responseUser := CreateResponseUser(user)
	responseProduct := CreateResponseProduct(product)
	responseOrder := CreateResponseOrder(order, responseUser, responseProduct)

	return c.Status(200).JSON(responseOrder)
}

// The GetOrders function retrieves all orders from the database, serializes the data, and returns it as a JSON response.
func GetOrders(c *fiber.Ctx) error {
	// Create an empty slice of the Order model to prepare for data storage.
	orders := []models.Order{}
	// Queries the database for all orders and stores the result in the orders slice.
	database.Database.Db.Find(&orders)
	responseOrders := []Order{}

	for _, order := range orders {
		var user models.User
		var product models.Product
		database.Database.Db.Find(&user, "id = ?", order.UserRefer)
		database.Database.Db.Find(&product, "id = ?", order.ProductRefer)
		responseOrder := CreateResponseOrder(order, CreateResponseUser(user), CreateResponseProduct(product))
		responseOrders = append(responseOrders, responseOrder)
	}

	return c.Status(200).JSON(responseOrders)
}

func FindOrder(id int, order *models.Order) error {
	database.Database.Db.Find(&order, "id = ?", id)
	if order.ID == 0 {
		return errors.New("order does not exist")
	}
	return nil
}

func GetOrder(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	var order models.Order

	if err != nil {
		return c.Status(400).JSON("Please ensure that :id is an integer")
	}

	if err := FindOrder(id, &order); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	var user models.User
	var product models.Product

	database.Database.Db.First(&user, order.UserRefer)
	database.Database.Db.First(&product, order.ProductRefer)
	responseUser := CreateResponseUser(user)
	responseProduct := CreateResponseProduct(product)

	responseOrder := CreateResponseOrder(order, responseUser, responseProduct)

	return c.Status(200).JSON(responseOrder)

}
