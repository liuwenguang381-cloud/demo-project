# demo-project

A minimal Node.js HTTP service.

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

Returns JSON:

```json
{"status":"ok"}
```

Example:

```text
http://localhost:3000/api/health
```
