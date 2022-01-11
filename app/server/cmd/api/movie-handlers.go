package main

import (
	"backend/models"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/julienschmidt/httprouter"
)

type jsonResp struct {
	OK bool `json:"ok"`
	Message string `json:"message"`
}

func (app *application) getOneMovie(w http.ResponseWriter, r *http.Request){
		params := httprouter.ParamsFromContext(r.Context())

		id, err := strconv.Atoi(params.ByName("id"))
		if err != nil {
			app.logger.Print(errors.New("invalid id parameter"))
			app.errorJSON(w, err)
			return
		}

		app.logger.Println("id is", id)

		// movie := models.Movie {
		// 	ID: id,
		// 	Title: "Some movie",
		// 	Description: "Some descritiption",
		// 	Year: 2021,
		// 	ReleaseDate: time.Date(2021,01,01,01,0,0,0, time.Local),
		// 	Runtime:100,
		// 	Rating: 5,
		// 	MPAARating: "PG-13",
		// 	CreatedAt: time.Now(),
		// 	UpdatedAt: time.Now(),
		// }

		movie, err := app.models.DB.Get(id)

		err = app.writeJSON(w, http.StatusOK, movie, "movie")
		if err != nil {
			app.errorJSON(w, err)
			return
		}
}


func (app *application) getAllMovies(w http.ResponseWriter, r *http.Request){
	movies, err := app.models.DB.All()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, movies, "movies")
		if err != nil {
			app.errorJSON(w, err)
			return
		}
}

func (app *application) getAllGenres (w http.ResponseWriter, r *http.Request) {
	genres, err := app.models.DB.GenresAll()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, genres, "genres")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) getAllMoviesByGenre(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	genreID, err := strconv.Atoi(params.ByName("genre_id"))

	if err != nil {
		app.errorJSON(w, err)
		return
	}

	movies, err := app.models.DB.All(genreID)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, movies, "movies")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}


type MoviePayload struct {
	ID string `json:"id"`
	Title string `json:"title"`
	Description string `json:"description"`
	Year string `json:"year"`
	ReleaseDate string `json:"release_date"`
	Runtime string `json:"runtime"`
	Rating string `json:"rating"`
	MPAARating string `json:"mpaa_rating"`
}


func (app *application) editMovie(w http.ResponseWriter, r *http.Request) {

	var payload MoviePayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	log.Println(payload.Title)

	var movie models.Movie

	if payload.ID != "0" {
		id, _ := strconv.Atoi(payload.ID)
		m, _ := app.models.DB.Get(id)
		movie = *m
		movie.UpdatedAt = time.Now()
	}

	movie.ID, _ = strconv.Atoi(payload.ID)
	movie.Title = payload.Title
	movie.Description = payload.Description
	movie.ReleaseDate, _ = time.Parse("2006-01-02", payload.ReleaseDate)
	movie.Year = movie.ReleaseDate.Year()
	movie.Runtime, _ = strconv.Atoi(payload.Runtime)
	movie.Rating, _ = strconv.Atoi(payload.Rating)
	movie.MPAARating = payload.MPAARating
	movie.CreatedAt = time.Now()
	movie.UpdatedAt = time.Now()

	if movie.ID == 0 {
		err = app.models.DB.InsertMovie(movie)
		if err != nil {
				app.errorJSON(w, err)
				return 
		}
	} else {
		err = app.models.DB.UpdateMovie(movie)
		if err != nil {
			app.errorJSON(w, err)
			return 
		}
	}

	ok:= jsonResp {
		OK: true,
	}

	err = app.writeJSON(w, http.StatusOK, ok, "response")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}


func (app *application) deleteMovie(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext((r.Context()))

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.models.DB.DeleteMovie(id)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	ok:= jsonResp {
		OK: true,
	}

	err = app.writeJSON(w, http.StatusOK, ok, "response")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}


func (app *application) searchMovies(w http.ResponseWriter, r *http.Request) {
	
}


