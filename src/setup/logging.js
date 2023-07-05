import { createLogger, format, transports } from 'winston';

import config from 'config';
import * as path from 'path';

const defaultMetaData = { service: 'platform-backend-service' };

// Custom formatter to include filename
const customFormat = format.printf(
  (info) =>
    `[${info.timestamp}][${info.level.toUpperCase()}] ${
      info.filename || 'UNKNOWN'
    }: ${info.message}`,
);

function addTransports() {
  if (process.env.NODE_ENV === 'development') {
    return [
      new transports.Console({
        format: format.combine(
          // Sets timestamp with TZ. We want to print this in local time ideally.
          format.timestamp({ format: 'YYYY-MM-DDThh:mm:ssZ' }),
          format.errors({ stack: true }),
          customFormat,
        ),
      }),
    ];
  }
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

/**
 * Initializes a logger with file name. This allows tracking message origin
 * without needing to parse stack traces. This does require user to create
 * the logger at the top of the file using `const logger = createLogger(__filename)`
 * @param {string} filename `__filename` should work for most use cases
 * @returns logger
 */
export default (filename) => {
  const relativePath = path.relative(process.cwd(), filename);
  return createLogger({
    level: config.get('logLevel'),
    transports: addTransports(),
    defaultMeta: { ...defaultMetaData, filename: relativePath },
  });
};
