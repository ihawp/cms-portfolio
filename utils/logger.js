const winston = require('winston');

const infoLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

module.exports = {
    infoLogger,
    
};