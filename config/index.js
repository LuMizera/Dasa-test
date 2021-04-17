const path = require('path');
const dotEnvPath = path.resolve(`.env.${process.env.NODE_ENV}`);

require('dotenv').config({
  path: dotEnvPath,
});

console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV);

const ENV = process.env.NODE_ENV || 'development';

const envConfig = require(path.join(__dirname, 'environments', ENV));
const config = Object.assign(
  {
    env: ENV,
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  envConfig
);

console.log('config.db :>> ', config.db);

module.exports = config;
