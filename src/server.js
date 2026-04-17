const http = require('http');
const { createApp } = require('./app');
const { config } = require('./config');
const { log } = require('./logger');

function startServer(port = config.port) {
  const app = createApp();
  const server = http.createServer(app);

  server.listen(port, () => {
    log('info', 'server_started', {
      appName: config.appName,
      port,
      environment: process.env.NODE_ENV || 'development',
    });
    console.log(`Server running at http://localhost:${port}`);
  });

  return server;
}

module.exports = {
  startServer,
};
