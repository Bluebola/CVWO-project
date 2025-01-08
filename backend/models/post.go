package models

import "time"

type Post struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	Title        string    `json:"title" gorm:"not null"`
	Content      string    `json:"content" gorm:"type:text;not null"`
	DateTime     time.Time `json:"date_time" gorm:"autoCreateTime"`
	Category     string    `json:"category" gorm:"not null"`
	UserID       uint      `json:"user_id" gorm:"not null"` // Foreign key to User
	User         User      `json:"user" gorm:"foreignKey:UserID;references:ID"`
	CommentCount int       `json:"comment_count" gorm:"default:0"`
}
