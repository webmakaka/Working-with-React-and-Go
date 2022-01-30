# [Udemy, Trevor Sawler] Working with React and Go (Golang) [ENG, 2021]

<br/>

**Final App:**  
https://learn-code.ca/

<br/>

## How to Run

```
$ sudo apt install -y jq
```

<br/>

### DataBase

```
$ docker-compose up
```

<br/>

```
$ cd data/

$ PGPASSWORD=pA55w0rd123 psql -U user1 -h localhost -p 5432 -d go_movies < go_movies.sql
```

<br/>

```
$ PGPASSWORD=pA55w0rd123 psql --host=localhost --username=user1 --port=5432 --dbname=go_movies -c 'ALTER TABLE movies ADD COLUMN poster character varying'
```

<br/>

### Server

```
$ cd app server
$ export GO_MOVIES_JWT=2dce505d96a53c5768052ee90f3df2055657518dad489160df9913f66042e160
go run cmd/api/*.go
```

<br/>

### Client

```
$ cd app client
$ yarn install
$ export REACT_APP_API_URL='http://localhost:4000'
$ yarn start
```

<br/>

## Development

### [React Client Development](./docs/01-Client-Development.md)

### [Golang Server Development](./docs/02-Server-Development.md)

<br/>

### [Deployment](./docs/03-Deployment.md)

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
