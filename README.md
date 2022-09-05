## Introdcution

MyTop100Movies are apis for managing your movie list by creating, retrieving, updating, deleting and ranking your top movies.

## Functionality

- [x] create
- [x] retrieve
- [x] update
- [x] delete
- [x] rank

## Installation Guide

To install this project you have to clone into your local setup

### Requirements

- Node (16.x)
- DB(relational Database `you make sure to change db type in app config file based on your choice`)
- NPM

### Pre-setup

Create a `.env` file then copy and paste data from `.env-example` into Your newly created `.env`,
make sure you fill all the information according to your setup

### Commands

#### install dependencies

```shell
yarn install
```

#### Run Migration

```shell
yarn run typeorm:run
```

#### Run Application

```shell
yarn start:dev
```

### Guide

#### API documentation

```
127.0.0.1:3000/api/docs/swagger-ui/#/
```

## Documentation

Live - https://tmvdb.herokuapp.com/docs/swagger-ui/#/
