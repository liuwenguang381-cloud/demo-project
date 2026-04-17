const { sendJson } = require('../utils/response');
const { validateEchoMessage } = require('../validation');

function handleEcho(req, res, url) {
  const message = validateEchoMessage(url);

  sendJson(res, 200, {
    echoed: message,
    length: message.length,
    timestamp: new Date().toISOString(),
  });
}

module.exports = {
  handleEcho,
};
