# Client Development

<br/>

## 05 Setting up our Go Back end as a REST API

<br/>

### 001 Installing the necessary software

1. Install vscode extension for go.
2. Restart vscode
3. vscode

```
^P
> Go: Install/Update Tools
```

select all, install and restart vscode

<br/>

### 002 Setting up the Go project

```
$ cd app/server
$ go mod init backend
```

<br/>

```
$ go run cmd/api/main.go
```

<br/>

http://localhost:4000/status

**returns:**

```
{
	"status": "Available",
	"environment": "development",
	"version": "1.0.0"
}
```

<br/>

### 003 Installing a router and creating better handlers

HttpRouter  
https://github.com/julienschmidt/httprouter

<br/>

```
$ go get -u github.com/julienschmidt/httprouter
```

<br/>

```
$ go run cmd/api/*.go
```

<br/>

http://localhost:4000/status

<br/>

### 004 Models

<br/>

### 005 Setting up a simple API route

<br/>

http://localhost:4000/v1/movie/12

<br/>

### 006 Improved error handling

// invalid syntax on request
http://localhost:4000/v1/movie/a

<br/>

### 007 Creating the database

```
$ docker-compose up
```

<br/>

```
$ cd data/

// pass pA55w0rd123
$ psql -U user1 -h localhost -p 5432 -d go_movies < go_movies.sql
```

<br/>

### 008 Creating our connection pool and connecting to the database

<br/>

```
$ go get -u github.com/lib/pq@v1.10.0
```

<br/>

### 009 Database functions & a challenge

```
$ PGPASSWORD=pA55w0rd123 psql --host=localhost --username=user1 --port=5432 --dbname=go_movies -c 'select id, title, description, year, release_date, rating, runtime, mpaa_rating, created_at, updated_at from movies where id = 1'
```

<br/>

```
$ curl http://localhost:4000/v1/movie/1 | jq
```

**response**

```
{
  "movie": {
    "id": 1,
    "title": "The Shawshank Redemption",
    "description": "Two imprisoned men bond over a number of years",
    "year": 1994,
    "release_date": "1994-10-14T00:00:00Z",
    "runtime": 142,
    "rating": 5,
    "mpaa_rating": "R",
    "created_at": "2021-05-17T00:00:00Z",
    "updated_at": "2021-05-17T00:00:00Z"
  }
}
```

<br/>

### 010 Solution to challenge

```
$ PGPASSWORD=pA55w0rd123 psql --host=localhost --username=user1 --port=5432 --dbname=go_movies -c "INSERT INTO movies_genres (movie_id, genre_id, created_at, updated_at) VALUES (1, 1, '2021-05-19', '2021-05-19');"
```

<br/>

```
$ curl http://localhost:4000/v1/movie/1 | jq
```

**response**

```
{
  "movie": {
    "id": 1,
    "title": "The Shawshank Redemption",
    "description": "Two imprisoned men bond over a number of years",
    "year": 1994,
    "release_date": "1994-10-14T00:00:00Z",
    "runtime": 142,
    "rating": 5,
    "mpaa_rating": "R",
    "genres": [
      {
        "genre": {
          "genre_name": "Drama"
        }
      }
    ]
  }
}
```

<br/>

### 011 An aside cleaning up our JSON feed

<br/>

```
$ curl http://localhost:4000/v1/movie/1 | jq
```

**response**

```
{
  "movie": {
    "id": 1,
    "title": "The Shawshank Redemption",
    "description": "Two imprisoned men bond over a number of years",
    "year": 1994,
    "release_date": "1994-10-14T00:00:00Z",
    "runtime": 142,
    "rating": 5,
    "mpaa_rating": "R",
    "genres": {
      "1": "Drama"
    }
  }
}
```

<br/>

### 012 Getting all movies as JSON

<br/>

```
$ curl http://localhost:4000/v1/movies | jq
```

**response**

```
{
  "movies": [
    {
      "id": 4,
      "title": "American Psycho",
      "description": " A wealthy New York investment banking executive hides his alternate psychopathic ego",
      "year": 2000,
      "release_date": "2000-04-14T00:00:00Z",
      "runtime": 102,
      "rating": 4,
      "mpaa_rating": "R",
      "genres": {}
    },
    {
      "id": 3,
      "title": "The Dark Knight",
      "description": "The menace known as the Joker wreaks havoc on Gotham City",
      "year": 2008,
      "release_date": "2008-07-18T00:00:00Z",
      "runtime": 152,
      "rating": 5,
      "mpaa_rating": "PG13",
      "genres": {}
    },
    {
      "id": 2,
      "title": "The Godfather",
      "description": "The aging patriarch of an organized crime dynasty transfers control to his son",
      "year": 1972,
      "release_date": "1972-03-24T00:00:00Z",
      "runtime": 175,
      "rating": 5,
      "mpaa_rating": "R",
      "genres": {}
    },
    {
      "id": 1,
      "title": "The Shawshank Redemption",
      "description": "Two imprisoned men bond over a number of years",
      "year": 1994,
      "release_date": "1994-10-14T00:00:00Z",
      "runtime": 142,
      "rating": 5,
      "mpaa_rating": "R",
      "genres": {
        "1": "Drama"
      }
    }
  ]
}
```

<br/>

### 013 Next Steps

<br/>

## 06 Connecting to our REST API

<br/>

### 001 Setting up CORS middleware

<br/>

### 006 Getting Genres from back end

<br/>

```
$ curl http://localhost:4000/v1/genres | jq
```

**response**

```
{
  "genres": [
    {
      "genre_name": "Action"
    },
    {
      "genre_name": "Adventure"
    },
    {
      "genre_name": "Comedy"
    },
    {
      "genre_name": "Comic Book"
    },
    {
      "genre_name": "Crime"
    },
    {
      "genre_name": "Drama"
    },
    {
      "genre_name": "Mystery"
    },
    {
      "genre_name": "Romance"
    },
    {
      "genre_name": "Sci-Fi"
    }
  ]
}
```

<br/>

### 008 Getting movies by Genre

<br/>

```
$ curl http://localhost:4000/v1/movies/1 | jq
```

**response**

```
{
  "movies": [
    {
      "id": 1,
      "title": "The Shawshank Redemption",
      "description": "Two imprisoned men bond over a number of years",
      "year": 1994,
      "release_date": "1994-10-14T00:00:00Z",
      "runtime": 142,
      "rating": 5,
      "mpaa_rating": "R",
      "genres": {
        "1": "Drama"
      }
    }
  ]
}

```

<br/>

## 07 Working with forms, React, and Go

<br/>

### 009 Receiving data on the REST back end

<br/>

### 011 Editing an existing movie

<br/>

### 014 Implementing delete on the back end

<br/>

## 08 Securing Routes in our REST API

<br/>

### 001 Generating JSON Web Tokens on the back end

<br/>

```
$ go get -u github.com/pascaldekloe/jwt
$ go get -u golang.org/x/crypto/bcrypt
```

<br/>

**Generate-a-password-hash**  
https://play.golang.org/p/uKMMCzJWGsW

**Generate-a-JWT-Secret**  
https://play.golang.org/p/s8KlqJIOWej

<br/>

### 005 Adding middleware to check for a valid token

<br/>

```
$ go get -u github.com/justinas/alice
```

<br/>

### 011 Making better error responses from our back end

<br/>

## 09 Adding GraphQL into the equation

<br/>

### 001 What is GraphQL?

<br/>

### 002 Setting up a schema and REST endpoint for GraphQL

<br/>

```
$ go get -u github.com/graphql-go/graphql
```

<br/>

### 003 Handling the GraphQL request

<br/>

### 005 Adding a search endpoint

<br/>

### 009 Modifying the back end to handle poster images

```
$ PGPASSWORD=pA55w0rd123 psql --host=localhost --username=user1 --port=5432 --dbname=go_movies -c 'ALTER TABLE movies ADD COLUMN poster character varying'
```

```
$ PGPASSWORD=pA55w0rd123 psql --host=localhost --username=user1 --port=5432 --dbname=go_movies -c 'select * from movies where false'
```

poster column has appeared

<br/>

JSON-from-themoviedb.org  
https://api.themoviedb.org/3/search/movie?api_key=b41447e6319d1cd467306735632ba733&query=The%20Shawshank%20Redemption

JSON-to-Go-converter  
https://mholt.github.io/json-to-go/

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
