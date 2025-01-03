package models

import "time"

// User model
type User struct {
	ID        uint      `gorm:"primaryKey"`
	ClerkID   string    `json:"clerk_id" gorm:"unique;not null"`
	Email     string    `json:"email" gorm:"unique;not null"`
	FirstName string    `json:"first_name" gorm:"not null"`
	LastName  string    `json:"last_name" gorm:"not null"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`

	// Relationships
	Posts    []Post    `gorm:"foreignKey:UserID"`
	Comments []Comment `gorm:"foreignKey:UserID"`
}
