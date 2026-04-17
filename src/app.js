const { URL } = require('url');
const { sendJson } = require('./utils/response');
const { handleRoot } = require('./routes/root');
const { handleHealth } = require('./routes/health');
const { handleInfo } = require('./routes/info');
const { handleEcho } = require('./routes/echo');
const { withErrorHandling, attachRequestLogging } = require('./middleware');

function methodNotAllowed(res, allowedMethods) {
  sendJson(res, 405, {
    error: 'Method Not Allowed',
    allowedMethods,
  });
}

function notFound(res, pathname, method) {
  sendJson(res, 404, {
    error: 'Not Found',
    path: pathname,
    method,
  });
}

function createApp() {
  return withErrorHandling(async function app(req, res) {
    attachRequestLogging(req, res);

    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const { pathname } = url;
    const method = req.method || 'GET';

    if (pathname === '/') {
      if (method !== 'GET') {
        methodNotAllowed(res, ['GET']);
        return;
      }
      handleRoot(req, res);
      return;
    }

    if (pathname === '/api/health') {
      if (method !== 'GET') {
        methodNotAllowed(res, ['GET']);
        return;
      }
      handleHealth(req, res);
      return;
    }

    if (pathname === '/api/info') {
      if (method !== 'GET') {
        methodNotAllowed(res, ['GET']);
        return;
      }
      handleInfo(req, res);
      return;
    }

    if (pathname === '/api/echo') {
      if (method !== 'GET') {
        methodNotAllowed(res, ['GET']);
        return;
      }
      handleEcho(req, res, url);
      return;
    }

    notFound(res, pathname, method);
  });
}

module.exports = {
  createApp,
};
