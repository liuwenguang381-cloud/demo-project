const { config } = require('./config');

const levels = {
  error: 0,
  info: 1,
  debug: 2,
};

function shouldLog(level) {
  const current = levels[config.logLevel] ?? levels.info;
  const target = levels[level] ?? levels.info;
  return target <= current;
}

function log(level, message, meta = {}) {
  if (!shouldLog(level)) {
    return;
  }

  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };

  console.log(JSON.stringify(entry));
}

module.exports = {
  log,
};
