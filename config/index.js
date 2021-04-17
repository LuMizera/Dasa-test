const path = require('path');
const dotEnvPath = path.resolve(`.env`);

require('dotenv').config({
  path: dotEnvPath,
});

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

module.exports = config;
