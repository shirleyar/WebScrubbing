'use strict';

const bunyan = require('bunyan'),
    constants = require('./constants');



const logger = bunyan.createLogger(
    {
        name: constants.APP_NAME,
        src: true,
        level: constants.LOG_LEVEL || "info",
    });

module.exports = logger;