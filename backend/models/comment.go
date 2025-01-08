package models

import "time"

type Comment struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Content   string    `json:"content" gorm:"type:text;not null"`
	PostID    uint      `json:"post_id" gorm:"not null"` // Foreign key to Post
	UserID    uint      `json:"user_id" gorm:"not null"` // Foreign key to User
	User      User      `json:"user" gorm:"foreignKey:UserID;references:ID"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
}
