const http = require('http');
const { createApp } = require('./app');

function startServer(port = process.env.PORT || 3000) {
  const app = createApp();
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  return server;
}

module.exports = {
  startServer,
};
