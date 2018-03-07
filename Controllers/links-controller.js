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
    return linksManager.getAllLinks()
        .then(links => {
            res.send(links);
        }).catch(error => {
            logger.error(error);
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(errorBuilder(error));
        });
}

function postLink(req, res) {
    let link = req.body.url;
    let idempotency_key = req.headers.idempotency_key;
    if (_.isEmpty(link) || !isUrl(link) || _.isEmpty(idempotency_key)) {
        let errorMsg = format(constants.ERROR_INVALID_PARAMETERS, link, idempotency_key);
        res.status(httpStatusCodes.BAD_REQUEST).send(errorBuilder(errorMsg));
    }
    return linksManager.scrubOrReturnData(link, idempotency_key)
        .then(linkObj =>{
            res.status(httpStatusCodes.CREATED).send(_.omit(linkObj, ['_id']));
        })

}

function wrongPath(req, res) {
    let errorMsg = format (constants.ERROR_WRONG_PATH, req.method, req.originalUrl);
    res.status(httpStatusCodes.NOT_FOUND).send(errorBuilder(errorMsg));
}

module.exports = {
    getLinks,
    postLink,
    wrongPath
};