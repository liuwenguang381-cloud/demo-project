const { AppError } = require('./errors');
const { sendJson } = require('./utils/response');
const { log } = require('./logger');

function withErrorHandling(handler) {
  return async function wrappedHandler(req, res) {
    try {
      await handler(req, res);
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const payload = {
        error: error instanceof AppError ? error.message : 'Internal Server Error',
      };

      if (error instanceof AppError && error.details) {
        payload.details = error.details;
      }

      log('error', 'request_failed', {
        method: req.method,
        url: req.url,
        statusCode,
        error: error.message,
      });

      sendJson(res, statusCode, payload);
    }
  };
}

function attachRequestLogging(req, res) {
  const startedAt = Date.now();

  res.on('finish', () => {
    log('info', 'request_completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
    });
  });
}

module.exports = {
  withErrorHandling,
  attachRequestLogging,
};
