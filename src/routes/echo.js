const { sendJson } = require('../utils/response');

function handleEcho(req, res, url) {
  const message = url.searchParams.get('message') || 'Hello';

  sendJson(res, 200, {
    echoed: message,
    length: message.length,
    timestamp: new Date().toISOString(),
  });
}

module.exports = {
  handleEcho,
};
