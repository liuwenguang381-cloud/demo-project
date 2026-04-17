const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data, null, 2));
}

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(text);
}

function routeRequest(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const { pathname, searchParams } = requestUrl;
  const method = req.method || 'GET';

  if (pathname === '/' && method === 'GET') {
    sendText(res, 200, 'Hello from demo-project');
    return;
  }

  if (pathname === '/api/health') {
    if (method !== 'GET') {
      sendJson(res, 405, {
        error: 'Method Not Allowed',
        allowedMethods: ['GET'],
      });
      return;
    }

    sendJson(res, 200, {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (pathname === '/api/info') {
    if (method !== 'GET') {
      sendJson(res, 405, {
        error: 'Method Not Allowed',
        allowedMethods: ['GET'],
      });
      return;
    }

    sendJson(res, 200, {
      name: 'demo-project',
      version: '1.0.0',
      runtime: 'Node.js',
    });
    return;
  }

  if (pathname === '/api/echo') {
    if (method !== 'GET') {
      sendJson(res, 405, {
        error: 'Method Not Allowed',
        allowedMethods: ['GET'],
      });
      return;
    }

    const message = searchParams.get('message') || 'Hello';

    sendJson(res, 200, {
      echoed: message,
      length: message.length,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  sendJson(res, 404, {
    error: 'Not Found',
    path: pathname,
    method,
  });
}

const server = http.createServer(routeRequest);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
