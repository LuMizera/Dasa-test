const { createContainer, asValue, asFunction } = require('awilix');

const app = require('./app');
const server = require('./interfaces/http/server');
const router = require('./interfaces/http/router');
const config = require('../config');
const logger = require('./infra/logging/logger');
const database = require('./infra/database');
const response = require('./infra/support/response');
const repository = require('./infra/repositories');

const container = createContainer();

container.register({
  app: asFunction(app).singleton(),
  server: asFunction(server).singleton(),
  router: asFunction(router).singleton(),
  logger: asFunction(logger).singleton(),
  database: asFunction(database).singleton(),
  response: asFunction(response).singleton(),
  config: asValue(config),
  repository: asFunction(repository).singleton(),
});

module.exports = container;
