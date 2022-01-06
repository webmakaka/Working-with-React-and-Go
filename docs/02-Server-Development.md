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

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
