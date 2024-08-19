# Бэкенд приложения TO-DO List

---

## Description
Организация проектов. Группировка задач по прогрессу выполнения и дедлайну задач.
Дополнительно - защитники (guard) по авторизации (jwt) или авторизации+роли.

- NestJs
  - Swagger UI
  - PrismaORM
  - JWT
  - Microservices (RabbitMQ)
- PostgreSQL
- Docker


## Get started
1. Запускаем БД и RabbitMQ
    ```bash
    docker-compose build 
    docker-compose up db_auth db_project rabbitmq
    ```

2. В директориях  `auth-service` и `project-service`
    ```
    run init-migration 
    ```

3. В директориях `api-gateway`, `auth-service` и `project-service`
    ```
    run start:dev 
    ```

4. Переходим на [сайт api](http://localhost:3000/api)

---

## Дополнительно

1. [pgAdmin](http://localhost:5050/)

- Авторизация
    - Вводим `PGADMIN_DEFAULT_EMAIL` и  `PGADMIN_DEFAULT_PASSWORD` (язык поменять при необходимости)

- Подключение к серверам\
    Нажимаем ПКМ на `Servers` -> `Register` -> `Server`
   - General: 
     - Name - любое (container_name)
   - Соединение (connection):
     - Имя/адрес сервера (Host name) - вводим имя контейнера (container_name)
     - Имя пользователя и пароль: `POSTGRES_USER` и `POSTGRES_PASSWORD`

2. [RabbitMQ](http://localhost:15673)

-Авторизация 
   - `RABBITMQ_DEFAULT_USER` и `RABBITMQ_DEFAULT_PASS`