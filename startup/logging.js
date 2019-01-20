const winston = require('winston');

module.exports = function () {
    winston.add(winston.transports.File, {filename: 'exceptions.log'});
    winston.handleExceptions(
        new winston.transports.File({filename: 'uncaughtExceptions.log'}),
        new winston.transports.Console({colorize: true, prettyPrint: true})
    );
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
}
