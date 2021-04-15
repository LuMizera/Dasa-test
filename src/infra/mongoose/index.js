const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

module.exports = ({ config, basePath, logger }) => {
  const connect = () => {
    return new Promise((resolve) => {
      mongoose
        .connect(config.db.url, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        })
        .then(() => {
          logger.info(`Database Connected on ${config.db.url}`);
          resolve();
        })
        .catch((error) => {
          logger.error('Failed to connect to database');
          throw new Error(error);
        });
    });
  };

  const db = {
    models: {},
    connect,
  };

  const dir = path.join(basePath, './models');
  fs.readdirSync(dir).forEach((file) => {
    const modelDir = path.join(dir, file);
    const model = require(modelDir);

    db.models[model.modelName] = model;
  });

  return db;
};
