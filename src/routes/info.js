const { sendJson } = require('../utils/response');
const { config } = require('../config');

function handleInfo(req, res) {
  sendJson(res, 200, {
    name: config.appName,
    version: '1.0.0',
    runtime: 'Node.js',
    environment: process.env.NODE_ENV || 'development',
    logLevel: config.logLevel,
  });
}

module.exports = {
  handleInfo,
};
