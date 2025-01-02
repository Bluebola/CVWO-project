package models

import "time"

type Order struct {
	ID           uint `json:"id" gorm:"primaryKey"`
	CreatedAt    time.Time
	ProductRefer int     `json:"product_id"`
	Product      Product `gorm:"foreignKey:ProductRefer"`
	UserRefer    int     `json:"user_id"`
	User         User    `gorm:"foreignKey:UserRefer"`
}

//  When creating a new Order, you only need to set the ProductRefer and UserRefer fields with the IDs of the existing Product and User records. The Product and User fields are used to establish the relationships and can be populated automatically by GORM when querying the database.

//  Create a new order:
//  newOrder := models.Order{
// 	CreatedAt:    time.Now(),
// 	ProductRefer: 1, // Assuming a product with ID 1 exists
// 	UserRefer:    1, // Assuming a user with ID 1 exists
// }

// Explanation
// ID: This field is marked with gorm:"primaryKey", indicating that it is the primary key. It is automatically filled by the database when a new record is created.
// CreatedAt: This field is automatically managed by GORM to store the timestamp when the record is created.
// ProductRefer: This field is a foreign key that references the Product table. It needs to be included in the JSON payload.
// Product: This field represents the related Product record. It is automatically populated by GORM based on the ProductRefer field.
// UserRefer: This field is a foreign key that references the User table. It needs to be included in the JSON payload.
// User: This field represents the related User record. It is automatically populated by GORM based on the UserRefer field.
