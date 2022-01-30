# Deployment

<br/>

### DataBase

**heroku**

<br/>

![Application](/img/pic-deployment-p01.png?raw=true)

<br/>

![Application](/img/pic-deployment-p02.png?raw=true)

<br/>

![Application](/img/pic-deployment-p03.png?raw=true)

<br/>

```
$ cd data/

$ psql postgres://facmbkdowylood:be063524e78708496a659049009010d48c91464cdf0fce745bea5022a78afa61@ec2-54-216-159-235.eu-west-1.compute.amazonaws.com:5432/d2f0evduie0jcv < go_movies.sql

$ psql postgres://facmbkdowylood:be063524e78708496a659049009010d48c91464cdf0fce745bea5022a78afa61@ec2-54-216-159-235.eu-west-1.compute.amazonaws.com:5432/d2f0evduie0jcv -c 'ALTER TABLE movies ADD COLUMN poster character varying'
```

<br/>

**or by export / import**

```
// export
$ pg_dump --no-owner go_movies > gm-sql
```

<br/>

```
// import
$ psql -d go_movies -f gm-sql
```

<br/>

### Server

**Check Local**

```
$ cd app/server
$ env GOOS=linux GOARCH=amd64 go build -o gomovies ./cmd/api
```

<br/>

```
$ ./gomovies -dsn="host=ec2-54-216-159-235.eu-west-1.compute.amazonaws.com
 port=5432 user=facmbkdowylood password=be063524e78708496a659049009010d48c91464cdf0fce745bea5022a78afa61 dbname=d2f0evduie0jcv"
```

<br/>

```
$ curl http://localhost:4000/v1/movies | jq
```

<br/>

**returns**

<br/>

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
      "created_at": "2021-05-17T00:00:00Z",
      "updated_at": "2021-05-17T00:00:00Z",
      "genres": {},
      "poster": ""
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
      "created_at": "2021-05-17T00:00:00Z",
      "updated_at": "2021-05-17T00:00:00Z",
      "genres": {},
      "poster": ""
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
      "created_at": "2021-05-17T00:00:00Z",
      "updated_at": "2021-05-17T00:00:00Z",
      "genres": {},
      "poster": ""
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
      "created_at": "2021-05-17T00:00:00Z",
      "updated_at": "2021-05-17T00:00:00Z",
      "genres": {},
      "poster": ""
    }
  ]
}
```

<br/>

**run on cloud vm**

<br/>

```
$ sudo apt-get update
$ sudo apt install -y vim jq
$ sudo apt install -y supervisor
```

<br/>

**install golang**

<br/>

```
$ cd ~/
$ git clone https://github.com/webmakaka/Working-with-React-and-Go
$ cd Working-with-React-and-Go/app/server/
```

<br/>

```
$ env GOOS=linux GOARCH=amd64 go build -o gomovies ./cmd/api
```

<br/>

```
$ mkdir ~/apps/
$ mv gomovies ~/apps/
$ cd ~/apps/
```

<br/>

```
$ ./gomovies -dsn="host=ec2-54-216-159-235.eu-west-1.compute.amazonaws.com
 port=5432 user=facmbkdowylood password=be063524e78708496a659049009010d48c91464cdf0fce745bea5022a78afa61 dbname=d2f0evduie0jcv"
```

<br/>

```
$ curl http://localhost:4000/v1/movies | jq
```

<br/>

```
OK!
```

<br/>

### Running the Go back end with supervisor

<br/>

```
$ cd /etc/supervisor/conf.d
```

<br/>

```
$ sudo vi api.conf
```

<br/>

```
[program:api]
command=env GO_MOVIES_JWT=2dce505d96a53c5768052ee90f3df2055657518dad489160df9913f66042e160 /home/ubuntu/apps/gomovies -dsn="host=ec2-54-216-159-235.eu-west-1.compute.amazonaws.com
 port=5432 user=facmbkdowylood password=be063524e78708496a659049009010d48c91464cdf0fce745bea5022a78afa61 dbname=d2f0evduie0jcv" -env=production
directory=/home/ubuntu/apps
autorestart=true
autostart=true
stdout_logfile=/home/ubuntu/apps/api.log
```

<br/>

```
$ sudo supervisorctl
> reread
> update
> status
```

<br/>

### Client

<br/>

```
$ cd ~/Working-with-React-and-Go/app/client/
$ export REACT_APP_API_URL='https://api.learn-code.ca'
$ yarn install
$ yarn build
$ mv build/ www.learn-code.ca
$ sudo mv www.learn-code.ca /var/www
$ sudo mkdri api.learn-code.ca
```

<br/>

### 007 Setting up the web server

https://caddyserver.com/docs/install

```
$ sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https

$ curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo tee /etc/apt/trusted.gpg.d/caddy-stable.asc

$ curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' |  sudo tee /etc/apt/sources.list.d/caddy-stable.list

$ sudo apt update
$ sudo apt install caddy
```

<br/>

```
$ cd /etc/caddy/
```

<br/>

```
$ sudo vi Caddyfile
```

<br/>

**Caddyfile**

```
{
    email   you@gmail.com
}

(static) {
        @static {
                file
                path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.svg *.woff *.json
        }
        header @static Cache-Control max-age=5184000
}

(security) {
        header {
                # enable HSTS
                Strict-Transport-Security max-age=31536000;
                # disable clients from sniffing the media type
                X-Content-Type-Options nosniff
                # keep referrer data off of HTTP connections
                Referrer-Policy no-referrer-when-downgrade
        }
}

import conf.d/*.conf
```

<br/>

```
$ sudo mkdir -p conf.d
$ cd conf.d
```

<br/>

```
$ sudo vi www.learn-code.ca.conf
```

<br/>

```
www.learn-code.ca learn-code.ca {
  encode zstd gzip
  import static
  import security

  root * /var/www/www.learn-code.ca

  file_server
}
```

<br/>

```
$ sudo vi api.learn-code.ca.conf
```

<br/>

```
api.learn-code.ca {
  encode zstd gzip
  import security
  reverse_proxy localhost:4000
}
```

<br/>

```
$ sudo service caddy start
$ sudo service caddy status
```

<br/>

```
$ curl http://localhost -H 'Host:www.learn-code.ca'
```

```
FAIL!
```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
