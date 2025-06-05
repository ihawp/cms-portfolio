const winston = require('winston');

const options = (level, filename) => ({
  level: process.env.LOGGER_LEVEL || 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename,
    }),
  ],
});

const logger = winston.createLogger(options(
    process.env.LOGGER_LEVEL || 'info',
    '/logs/combined.log'
));

const infoLogger = winston.createLogger(options(
    'info',
    '/logs/info.log'
));

module.exports = {
    logger,
    infoLogger
};