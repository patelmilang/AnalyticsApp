const winston = require('winston')
const { createLogger, format, transports } = require("winston");
const options = {
  file: {
    level: 'info',
    filename: `./logs/${new Date().getDate()}${new  Date().getMonth()+1}${ new  Date().getFullYear()}app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
  },
};

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({
        label: `Label🏷️`
    }),
    winston.format.timestamp({
       format: 'MMM-DD-YYYY HH:mm:ss'
   }),
    winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
  ),
  //format: format.combine(format.timestamp(), format.json()),
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false,
  
})

module.exports = logger