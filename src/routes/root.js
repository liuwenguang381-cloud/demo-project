const { sendText } = require('../utils/response');

function handleRoot(req, res) {
  sendText(res, 200, 'Hello from demo-project');
}

module.exports = {
  handleRoot,
};
