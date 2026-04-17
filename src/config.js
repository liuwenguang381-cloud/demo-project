require('dotenv').config();

function toPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
}

const config = {
  port: toPositiveInteger(process.env.PORT, 3000),
  appName: process.env.APP_NAME || 'demo-project',
  logLevel: process.env.LOG_LEVEL || 'info',
};

module.exports = {
  config,
};
