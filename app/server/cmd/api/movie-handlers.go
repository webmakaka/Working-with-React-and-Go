package main

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

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

func (app *application) deleteMovie(w http.ResponseWriter, r *http.Request) {

}

func (app *application) insertMovie(w http.ResponseWriter, r *http.Request) {
	
}

func (app *application) updateMovie(w http.ResponseWriter, r *http.Request) {
	
}

func (app *application) searchMovies(w http.ResponseWriter, r *http.Request) {
	
}