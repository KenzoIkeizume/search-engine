# Search Engine
Simple search engine for users

## Technologies
[![](https://img.shields.io/badge/-node.js-%2343853d)](https://nodejs.org/)
[![](https://img.shields.io/badge/-elasticsearch-%2324bbb1)](https://www.elastic.co/)
[![](https://img.shields.io/badge/-docker-%230073ec)](https://www.docker.com/)
[![](https://img.shields.io/badge/-jest-%23c2a813)](https://jestjs.io/)

## Running the project

Start the project
```
make fix // option if the docker has too low memory
make run
```

Auth
```
Get the authorization token
The routes requires Bearer Token authorization
The token has expiration of 1 hour

[GET] /api/login 
```

Database configuration
```
Initial configuration database with csv and list of relevance

[POST] /api/configs/upload
```

Routes

- `[GET] /api/login` api auth
- `[POST] /api/configs/upload` initial api configuration and database
- `[GET] /api/users?name=Everson&from=2&size=15` get users route

Description                     | Command
-----------------------------   | -----------------------------
Test ElasticSearch is up        | curl http://localhost:9200
Run the project in docker       | make run
Fix the docker memory           | make fix
Reset teh volumes and docker    | make reset
Configure the local project env | make setup-env

## Test
```
nvm use
npm run install
npm run test
```

## Lint
```
nvm use
npm run lint
npm run lint:fix
```

## Troubleshooting

### ElasticSearch

```
bootstrap check failure [1] of [1]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]

exited with code 78
```
1. sysctl -w vm.max_map_count=262144
2. systemctl restart docker
