const mongoose = require('../../infra/mongoose');

module.exports = ({ logger, config }) => {
  if (!config.db) {
    logger.error('Database config file log not found, disabling database.');
    return false;
  }

  return mongoose({ config, basePath: __dirname, logger });
};
