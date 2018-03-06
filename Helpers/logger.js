'use strict';

const bunyan = require('bunyan'),
    constants = require('./constants');



const logger = bunyan.createLogger(
    {
        name: constants.APP_NAME,
        src: true,
    });

module.exports = logger;