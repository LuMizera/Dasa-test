const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

const { Router } = require('express');
const { partialRight } = require('ramda');

const controller = require('./utils/create_controller');
const httpLogger = require('./middlewares/http_logger');
const errorHandler = require('./middlewares/error_handler');

module.exports = ({ config, logger }) => {
  const router = Router();

  if (config.env === 'development') {
    router.use(statusMonitor());
  }

  if (config.env !== 'test') {
    router.use(httpLogger(logger));
  }

  const apiRouter = Router();

  apiRouter
    .use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    )
    .use(bodyParser.json())
    .use(compression());

  apiRouter.use('/', controller('index'));
  apiRouter.use('/laboratories', controller('laboratory').router);
  apiRouter.use('/exams', controller('exam').router);

  router.use(`/api/`, apiRouter);

  router.use(partialRight(errorHandler, [logger, config]));

  return router;
};
