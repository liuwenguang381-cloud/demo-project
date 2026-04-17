const { createValidationError } = require('./errors');

function validateEchoMessage(url) {
  const rawMessage = url.searchParams.get('message');

  if (rawMessage === null) {
    return 'Hello';
  }

  const message = rawMessage.trim();

  if (!message) {
    throw createValidationError('Query parameter "message" must not be empty.', {
      field: 'message',
    });
  }

  if (message.length > 100) {
    throw createValidationError('Query parameter "message" must be 100 characters or fewer.', {
      field: 'message',
      maxLength: 100,
    });
  }

  return message;
}

module.exports = {
  validateEchoMessage,
};
