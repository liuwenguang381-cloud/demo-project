# demo-project

A minimal but structured Node.js HTTP service.

## Requirements

- Node.js
- npm

## Install

```bash
npm install
```

## Run

```bash
npm start
```

After the server starts, you should see:

```text
Server running at http://localhost:3000
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

Returns basic service metadata:

```json
{
  "name": "demo-project",
  "version": "1.0.0",
  "runtime": "Node.js"
}
```

### `GET /api/echo?message=hello`

Echoes the provided query parameter:

```json
{
  "echoed": "hello",
  "length": 5,
  "timestamp": "2026-04-17T12:34:56.789Z"
}
```

### Unknown routes

Unknown routes now return a JSON 404 response:

```json
{
  "error": "Not Found",
  "path": "/unknown",
  "method": "GET"
}
```

### Unsupported methods

Unsupported methods return a JSON 405 response with allowed methods.
