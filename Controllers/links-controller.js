'use strict';

const linksManager = require('../Managers/links-manager'),
    logger = require('../Helpers/logger'),
    httpStatusCodes = require('http-status-codes'),
    _ = require('lodash'),
    errorBuilder = require('../Helpers/error-builder'),
    constants = require('../Helpers/constants'),
    format = require('util').format,
    isUrl= require('is-url');


function getLinks(req, res) {
    logger.info("Received GET %s request from ", req.originalUrl, req.ip);
    return linksManager.getAllLinks()
        .then(links => {
            let code = httpStatusCodes.OK;
            logger.info("Returned response successfully");
            logger.debug("Returned response - status: %s body: %j", code, links);
            res.send(links);
        }).catch(error => {
            let code = httpStatusCodes.INTERNAL_SERVER_ERROR;
            let errorObj = errorBuilder(constants.ERROR_SOMETHING_WENT_WRONG, code);
            logger.error("Error in GET: ", error);
            logger.debug("Returned response - status: %s body: %j", code, errorObj);
            res.status(code).send(errorObj);
        });
}

function postLink(req, res) {
    logger.info("Received POST %s request from ", req.originalUrl, req.ip);
    let link = req.body.url;
    let idempotency_key = req.headers.idempotency_key;
    if (_.isEmpty(link) || !isUrl(link) || _.isEmpty(idempotency_key)) {
        let errorMsg = format(constants.ERROR_INVALID_PARAMETERS, link, idempotency_key);
        let code = httpStatusCodes.BAD_REQUEST;
        let errorObj = errorBuilder(errorMsg, code);
        logger.error("Error in POST: ", errorMsg);
        logger.debug("Returned response - status: %s body: %j", code, errorObj);
        res.status(code).send(errorObj);
    }
    return linksManager.scrubOrReturnData(link, idempotency_key)
        .then(linkObj =>{
            let code = httpStatusCodes.CREATED;
            let body = _.omit(linkObj, ['_id']);
            logger.info("Returned response successfully");
            logger.debug("Returned response - status: %s body: %j", code, body);
            res.status(code).send(body);
        }).catch(error => {
            let code = httpStatusCodes.INTERNAL_SERVER_ERROR;
            let errorObj = errorBuilder(constants.ERROR_SOMETHING_WENT_WRONG, code);
            logger.error("Error in POST: ", error);
            logger.debug("Returned response - status: %s body: %j", code, errorObj);
            res.status(code).send(errorObj);
        });
}

function wrongPath(req, res) {
    logger.info("Received %s %s request from ", req.method, req.originalUrl, req.ip);
    let errorMsg = format (constants.ERROR_WRONG_PATH, req.method, req.originalUrl);
    let code = httpStatusCodes.NOT_FOUND;
    let errorObj = errorBuilder(errorMsg, code);
    logger.error("Wrong path request: ", errorMsg);
    logger.debug("Returned response - status: %s body: %j", code, errorObj);
    res.status(code).send(errorObj);
}

module.exports = {
    getLinks,
    postLink,
    wrongPath
};