package models

import (
	"database/sql"
	"time"
)

// Models is the wrapper for database
type Models struct {
	DB DBModel
}

// NewModels returns models with db pool
func NewModels(db *sql.DB) Models {
	return Models {
		DB: DBModel{DB: db},
	}
}

type Movie struct {
	ID int `json:"id"`
	Title string `json:"title"`
	Description string `json:"description"`
	Year int `json:"year"`
	ReleaseDate time.Time `json:"release_date"`
	Runtime int `json:"runtime"`
	Rating int `json:"rating"`
	MPAARating string `json:"mpaa_rating"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
	MovieGenre map[int]string `json:"genres"`
}

type Genre struct {
	ID int `json:"-"`
	GenreName string `json:"genre_name"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type MovieGenre struct {
	ID int `json:"-"`
	MovieID int `json:"-"`
	GenreID int `json:"-"`
	Genre Genre `json:"genre"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}