const { sendJson } = require('../utils/response');

function handleInfo(req, res) {
  sendJson(res, 200, {
    name: 'demo-project',
    version: '1.0.0',
    runtime: 'Node.js',
  });
}

module.exports = {
  handleInfo,
};
