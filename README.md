# demo-project

A small Node.js service with structured routing, automated tests, GitHub Actions, and Docker support.

## Features

- `src/` based project structure
- Plain Node.js HTTP server with no external runtime dependencies
- JSON API endpoints
- Automated tests with `node:test`
- GitHub Actions CI workflow
- Docker support

## Requirements

- Node.js 20+
- npm

## Install

```bash
npm install
```

## Run locally

```bash
npm start
```

After the server starts, you should see:

```text
Server running at http://localhost:3000
```

## Run tests

```bash
npm test
```

## Docker

Build the image:

```bash
docker build -t demo-project .
```

Run the container:

```bash
docker run -p 3000:3000 demo-project
```

## Project structure

```text
.
├── .github/workflows/ci.yml
├── Dockerfile
├── index.js
├── package.json
├── src
│   ├── app.js
│   ├── server.js
│   ├── routes
│   │   ├── echo.js
│   │   ├── health.js
│   │   ├── info.js
│   │   └── root.js
│   └── utils
│       └── response.js
└── tests
    └── app.test.js
```

## Endpoints

### `GET /`

Returns plain text:

```text
Hello from demo-project
```

### `GET /api/health`

Returns service health information:

```json
{
  "status": "ok",
  "uptime": 12.345,
  "timestamp": "2026-04-17T12:34:56.789Z"
}
```

### `GET /api/info`

Returns service metadata:

```json
{
  "name": "demo-project",
  "version": "1.0.0",
  "runtime": "Node.js"
}
```

### `GET /api/echo?message=hello`

Echoes the query string parameter:

```json
{
  "echoed": "hello",
  "length": 5,
  "timestamp": "2026-04-17T12:34:56.789Z"
}
```

### Unknown routes

Unknown routes return a JSON 404 response:

```json
{
  "error": "Not Found",
  "path": "/unknown",
  "method": "GET"
}
```

### Unsupported methods

Unsupported methods return a JSON 405 response with allowed methods.
