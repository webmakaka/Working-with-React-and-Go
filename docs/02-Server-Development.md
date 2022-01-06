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

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
