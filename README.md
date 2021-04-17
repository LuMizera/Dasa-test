# Dasa test for backend position
> RESTful api with Domain Driven Design

## Architecture Info
This API was developed using a Layer Architecture, with DDD as its design.

The layers:
1. **Interfaces**: In this layer you will find every way that the API has to communicate with the user or a service calling, in or case, only the HTTP is avalible, but we can implement WebSockets and whatever type of communication you may want.
2. **App**: This layer will hold the internal communications of the API, it will contact the DOMAIN layer and the INFRA layer.
3. **Infra**: Where the database connection, logging, support files and etc. Will be held.
4. **Domain**: Where the businness rules will be hosted, the whole point of DDD is focused on this layer, as it holds the most important part of our application (besides security). This layer will say which models should exits, what is required and what is not, and the model of every single field on the application.

## Development Environment Setup

1.  Make sure you have node `v14.16.0` or `LTS` version installed
2.  Install `yarn` - `npm install -g yarn`.

### NOTE:
If you update your node version to latest and you encountered compatibility issues:
1. Ensure that there is no `pm2` runnign `pm2 list` (if there is kill the process)

## Documentation - Swagger
Access `http://localhost:<PORT>/api/swagger` for the entire UI documentation of the API, also if you want to just take the JSON one you will be able to do it on `http://localhost:<PORT>/api/swagger/json`

## Docker support

**Prerequisites**
1. [Docker](https://www.docker.com/products/docker-engine) Community Edition v17 or higher

```sh
$ docker-compose up -d
```
Access `http://localhost:<PORT>/api` and you're ready to go!
> http://localhost:7777/api

### NOTE:
`docker-compose` will set-up a `mongodb` instance for you, located in `mongodb://localhost:27017/`

User will be created inside `mongo-init.js` and can be changed.
```js
db.createUser({
  user: 'defaultUser', // user
  pwd: 'defaultPwd', // password
  roles: [
    {
      role: 'readWrite',
      db: 'Dasa', // default database
    },
  ],
});
```
Admin password and username are both "root".

## Overview

- uses Node.js > v9
- written using ES6
- uses `Yarn` for package dependency management
- uses `mongodb` as databse

## CLI Tools

- `yarn start:dev` - start the Node-DDD API Boilerplate locally/development
- `docker:script` - will run the docker compose for you
- `yarn lint` - lint codebase using JavaScript Standard Style
- `yarn lint:fix` - fix code according to JS Standard Style
- `yarn add <package-name>` - add a new package to package.json
- `yarn remove <package-name>` - remove package from package.json

## Tech

- [Express](https://expressjs.com/) - Node Framweork
- [Awilix](https://github.com/jeffijoe/awilix) - dependency resolution support powered by `Proxy`
- [PM2](https://github.com/Unitech/pm2) - production process manager for Node.js applications with a built-in load balancer
- [Nodemon](https://nodemon.io/) - Use for development file reload.
- [Tcomb](https://github.com/gcanti/tcomb) - s a library for Node.js and the browser which allows you to check the types of JavaScript values at runtime with a simple and concise syntax
- [Express-status-monitor](https://github.com/RafalWilinski/express-status-monitor) - Simple, self-hosted module based on Socket.io and Chart.js to report realtime server metrics for Express-based node servers.
- [CORS](https://github.com/expressjs/cors) - a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [Body-parser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware.
- [Compression](https://github.com/expressjs/compression) - Node.js compression middleware.
- [Http-status](https://github.com/adaltas/node-http-status) - Utility to interact with HTTP status code.
- [Winston](https://github.com/winstonjs/winston) - A multi-transport async logging library for node.js.
- [Morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
- [Ramda](http://ramdajs.com/) - A practical functional library for JavaScript programmers.
- [Mongoose](https://mongoosejs.com/) - ODM for MongoDB.
- [Swagger-ui](https://swagger.io/swagger-ui/) - visualize and interact with the API’s resources without having any of the implementation logic in place.
- [Swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)- enables you to integrate Swagger using JSDoc comments in your code. Just add @swagger on top of your DocBlock and declare the meaning of your code in yaml complying to the OpenAPI specification.

### Logging
- [winston](https://github.com/winstonjs/winston) - a multi-transport async logging library for Node.js. It is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file.
- [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for Node.js. A helper that collects logs from your server, such as your request logs.
