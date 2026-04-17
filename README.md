# demo-project

A production-style small Node.js service with structured routing, configuration, request logging, validation, automated tests, GitHub Actions, and Docker support.

## Features

- `src/` based project structure
- Plain Node.js HTTP server
- `.env` based configuration
- Structured JSON request logging
- Input validation for API parameters
- Unified JSON error responses
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

## Environment variables

Copy the example file:

```bash
cp .env.example .env
```

Available variables:

- `PORT`: server port, default `3000`
- `APP_NAME`: application name, default `demo-project`
- `LOG_LEVEL`: log level, default `info`

Example:

```env
PORT=3000
APP_NAME=demo-project
LOG_LEVEL=info
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

## Logging

The service writes structured JSON logs to standard output.

Example request log:

```json
{
  "level": "info",
  "message": "request_completed",
  "timestamp": "2026-04-17T12:34:56.789Z",
  "method": "GET",
  "url": "/api/health",
  "statusCode": 200,
  "durationMs": 3
}
```

Example startup log:

```json
{
  "level": "info",
  "message": "server_started",
  "timestamp": "2026-04-17T12:34:56.789Z",
  "appName": "demo-project",
  "port": 3000,
  "environment": "development"
}
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
├── .env.example
├── .github/workflows/ci.yml
├── Dockerfile
├── index.js
├── package.json
├── src
│   ├── app.js
│   ├── config.js
│   ├── errors.js
│   ├── logger.js
│   ├── middleware.js
│   ├── server.js
│   ├── validation.js
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
  "runtime": "Node.js",
  "environment": "development",
  "logLevel": "info"
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

## Input validation

`/api/echo` validates the `message` query parameter:

- Empty values are rejected
- Messages longer than 100 characters are rejected

Example invalid request:

```text
/api/echo?message=%20%20%20
```

Example validation error response:

```json
{
  "error": "Query parameter \"message\" must not be empty.",
  "details": {
    "field": "message"
  }
}
```

## Error responses

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

Unsupported methods return a JSON 405 response:

```json
{
  "error": "Method Not Allowed",
  "allowedMethods": ["GET"]
}
```

### Validation errors

Validation failures return a JSON 400 response:

```json
{
  "error": "Query parameter \"message\" must be 100 characters or fewer.",
  "details": {
    "field": "message",
    "maxLength": 100
  }
}
```

### Internal server errors

Unexpected failures return a JSON 500 response:

```json
{
  "error": "Internal Server Error"
}
```
