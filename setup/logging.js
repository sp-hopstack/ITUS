const { createLogger, format, transports, add } = require('winston');
const config = require('config');
const path = require('path');

let defaultMetaData = { service: 'platform-backend-service' };
process.env.NODE_ENV = 'development';

// Custom formatter to include filename
const customFormat = format.printf((info) => {
  // console.log(info);
  return `[${info.timestamp}][${info.level.toUpperCase()}] ${
    info.filename || 'UNKNOWN'
  }: ${info.message}`;
});

function addTransports() {
  if (process.env.NODE_ENV == 'development') {
    return [
      new transports.Console({
        format: format.combine(
          //Sets timestamp with TZ. We want to print this in local time ideally.
          format.timestamp({ format: 'YYYY-MM-DDThh:mm:ssZ' }),
          format.errors({ stack: true }),
          customFormat,
        ),
      }),
    ];
  } else {
    // In production, log in structured format to console
    return [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.errors({ stack: true }),
          format.json(),
        ),
      }),
    ];
  }
}

/**
 * Initializes a logger with file name. This allows tracking message origin without needing to parse stack traces. This does require user to create the logger at the top of the file using `const logger = createLogger(__filename)`
 * @param {string} filename `__filename` should work for most use cases
 * @returns logger
 */
function createFileLogger(filename) {
  const relativePath = path.relative(process.cwd(), filename);
  const _logger = createLogger({
    level: config.get('logLevel'),
    transports: addTransports(),
    defaultMeta: { ...defaultMetaData, filename: relativePath },
  });

  return _logger;
}

module.exports = createFileLogger;
