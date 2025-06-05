const winston = require('winston');

const infoLogger = winston.createLogger({
  level: process.env.LOGGER_LEVEL || 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
    }),
  ],
});
module.exports = {
    infoLogger,

};