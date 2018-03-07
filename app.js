'use strict';

const express = require('express'),
    body_parser = require('body-parser'),
    format = require('util').format,
    router = require('./Routers/links-router'),
    mongoDbConnector = require('./Connectors/MongoDB-connector'),
    constants = require('./Helpers/constants'),
    logger = require('./Helpers/logger');


const app = express();
const URL = format('%s/%s', constants.BASE_URL, constants.VERSION);

app.use(body_parser.json());
app.use(URL, router);

mongoDbConnector.connect()
    .then(()=>{
        app.listen(constants.PORT);
        logger.info('App is up and running. Port: ', constants.PORT);
    }).catch((error)=> {
        logger.error('Error while starting app: %j', error);
        throw (error);
    });

module.exports = app;