const { sendJson } = require('../utils/response');

function handleHealth(req, res) {
  sendJson(res, 200, {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}

module.exports = {
  handleHealth,
};
