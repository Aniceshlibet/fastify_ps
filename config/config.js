require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';

module.exports = {
  development: {
    username: process.env.DB_USER || 'zus',
    password: process.env.DB_PASS || 'azerty02',
    database: process.env.DB_NAME || 'db_delta',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER || 'zus',
    password: process.env.DB_PASS || 'azerty02',
    database: process.env.DB_NAME || 'db_delta',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER || 'zus',
    password: process.env.DB_PASS || 'azerty02',
    database: process.env.DB_NAME || 'db_delta',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
}[environment];
