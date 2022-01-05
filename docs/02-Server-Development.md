# Client Development

<br/>

## 05 Setting up our Go Back end as a REST API

<br/>

### 001 Installing the necessary software

1. Install vscode extension for go.
2. Restart vscode
3.

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

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
