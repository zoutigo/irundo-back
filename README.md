## Description

Ordering app Nestjs - Docker - RabbitMq - Microservices

## Installation

After cloning the repository , install depedencies en env variables

### Dependencies intallation

```bash
$ npm install
```

### Env variables

in each microservice , create .env file with the below values

- auth
  PORT=3001
  JWT_EXPIRATION=3600
  JWT_SECRET=lebonplan
  POSTGRES_URL=postgres://postgres:my_password@postgresql-master:5432/my_database
  RABBIT_MQ_URL=amqp://rabbitmq:5672
  RABIIT_MQ_AUTH_QUEUE=AUTH

- orders
  POSTGRES_URL=postgres://postgres:my_password@postgresql-master:5432/my_database
  PORT=3000
  RABBIT_MQ_URL=amqp://rabbitmq:5672
  RABIIT_MQ_BILLING_QUEUE=BILLING
  RABIIT_MQ_AUTH_QUEUE=AUTH

- billing
  RABBIT_MQ_URL=amqp://rabbitmq:5672
  RABIIT_MQ_BILLING_QUEUE=BILLING

## Running the app

```bash
# development
$ docker-compose up --build -V


```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
