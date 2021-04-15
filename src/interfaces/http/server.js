const express = require('express');

module.exports = ({ config, router, logger }) => {
  const app = express();

  app.disable('x-powered-by');
  app.use(router);

  app.use(express.static('public'));

  return {
    app,
    start: () => new Promise(() => {
      const http = app.listen(config.port, () => {
        const { port } = http.address();
        logger.info(`API - Port ${port}`);
      });
    }),
  };
};
