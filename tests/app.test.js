const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const { createApp } = require('../src/app');

function request(server, path, method = 'GET') {
  const address = server.address();

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: address.port,
        path,
        method,
      },
      (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body,
          });
        });
      }
    );

    req.on('error', reject);
    req.end();
  });
}

async function withServer(run) {
  const app = createApp();
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));

  try {
    await run(server);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
}

test('GET / returns hello text', async () => {
  await withServer(async (server) => {
    const response = await request(server, '/');
    assert.equal(response.statusCode, 200);
    assert.match(response.headers['content-type'], /text\/plain/);
    assert.equal(response.body, 'Hello from demo-project');
  });
});

test('GET /api/health returns health payload', async () => {
  await withServer(async (server) => {
    const response = await request(server, '/api/health');
    const json = JSON.parse(response.body);

    assert.equal(response.statusCode, 200);
    assert.equal(json.status, 'ok');
    assert.equal(typeof json.uptime, 'number');
    assert.equal(typeof json.timestamp, 'string');
  });
});

test('GET /api/info returns service metadata', async () => {
  await withServer(async (server) => {
    const response = await request(server, '/api/info');
    const json = JSON.parse(response.body);

    assert.equal(response.statusCode, 200);
    assert.equal(json.name, 'demo-project');
    assert.equal(json.version, '1.0.0');
    assert.equal(json.runtime, 'Node.js');
    assert.equal(typeof json.environment, 'string');
    assert.equal(typeof json.logLevel, 'string');
  });
});

test('GET /api/echo echoes query string', async () => {
  await withServer(async (server) => {
    const response = await request(server, '/api/echo?message=hello');
    const json = JSON.parse(response.body);

    assert.equal(response.statusCode, 200);
    assert.equal(json.echoed, 'hello');
    assert.equal(json.length, 5);
  });
});

test('GET /api/echo returns validation error for empty message', async () => {
  await withServer(async (server) => {
    const response = await request(server, '/api/echo?message=%20%20%20');
    const json = JSON.parse(response.body);

    assert.equal(response.statusCode, 400);
    assert.equal(json.error, 'Query parameter "message" must not be empty.');
    assert.equal(json.details.field, 'message');
  });
});

test('GET /api/echo returns validation error for overly long message', async () => {
  await withServer(async (server) => {
    const longMessage = 'a'.repeat(101);
    const response = await request(server, `/api/echo?message=${longMessage}`);
    const json = JSON.parse(response.body);

    assert.equal(response.statusCode, 400);
    assert.equal(json.error, 'Query parameter "message" must be 100 characters or fewer.');
    assert.equal(json.details.field, 'message');
    assert.equal(json.details.maxLength, 100);
  });
});

test('unknown route returns 404 json', async () => {
  await withServer(async (server) => {
    const response = await request(server, '/missing');
    const json = JSON.parse(response.body);

    assert.equal(response.statusCode, 404);
    assert.equal(json.error, 'Not Found');
    assert.equal(json.path, '/missing');
  });
});

test('unsupported method returns 405 json', async () => {
  await withServer(async (server) => {
    const response = await request(server, '/api/health', 'POST');
    const json = JSON.parse(response.body);

    assert.equal(response.statusCode, 405);
    assert.equal(json.error, 'Method Not Allowed');
    assert.deepEqual(json.allowedMethods, ['GET']);
  });
});
