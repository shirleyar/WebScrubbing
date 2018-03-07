'use strict';

const linksModel = require('../Models/links-model'),
    scrubber = require('../Helpers/scrubber'),
    linkValidator = require('../Helpers/link-validator'),
    MongoDbConnector = require('../Connectors/MongoDB-connector'),
    logger = require('../Helpers/logger');

function scrubOrReturnData(link, idempotency_key) {
    return MongoDbConnector.getLinksByOriginAndIdempotencyKey(link, idempotency_key)
        .then(result => {
            if (_.isEmpty(result)) {
                return scrubWebPageAndSave(link, idempotency_key);
            } else {
                return Promise.resolve(result);
            }
        }).catch(error => {
            logger.error(error);
            return Promise.reject(error);
        })
}

function scrubWebPageAndSave(link, idempotency_key) {
    return scrubber.getLinks(link)
        .then(links => {
            return Promise.all(links.map(linkValidator.validate))
        }).then(validatedLinks => {
            return Promise.resolve(linksModel(link, validatedLinks, idempotency_key));
        }).catch(error => {
            logger.error(error);
            return Promise.reject(error);
        });
}

function getAllLinks() {
    return MongoDbConnector.getAllLinks()
        .then(data => {
            let allLinks = [];
            data.forEach(originLink => {
                let links = originLink.links.map(linkInOrigin => linkInOrigin.link);
                allLinks = _.union(allLinks, links);
            });
            return Promise.resolve(allLinks);
        }).catch(error => {
            logger.error(error);
            return Promise.reject(error);
        });
}


module.exports = {
    scrubOrReturnData,
    getAllLinks
};