const path = require('path');
const dotEnvPath = path.resolve('.env');

require('dotenv').config({ path: dotEnvPath });

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
