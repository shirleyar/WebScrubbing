'use strict';

const linksModel = require('../Models/links-model'),
    scrubber = require('../Helpers/scrubber'),
    linkValidator = require('../Helpers/link-validator'),
    MongoDbConnector = require('../Connectors/MongoDB-connector'),
    logger = require('../Helpers/logger'),
    _ = require('lodash');

function scrubOrReturnData(link, idempotency_key) {
    return new Promise((resolve, reject) => {
        return MongoDbConnector.getLinksByOriginAndIdempotencyKey(link, idempotency_key)
            .then(result => {
                if (_.isEmpty(result)) {
                    resolve(scrubWebPageAndSave(link, idempotency_key));
                } else {
                    resolve(result[0]);
                }
            }).catch(error => {
                logger.error(error);
                reject(error);
            })
    })
}

function scrubWebPageAndSave(link, idempotency_key) {
    let linkObj;
    return new Promise((resolve, reject) => {
        return scrubber.getLinks(link)
            .then(links => {
                return Promise.all(links.map(linkValidator.validate))
            }).then(validatedLinks => {
                linkObj = linksModel.buildObj(link, validatedLinks, idempotency_key);
                return MongoDbConnector.saveLinks(linkObj)
            }).then(() => {
                resolve(linkObj)
            }).catch(error => {
                logger.error("Error during scrub or save: ", error.message);
                reject(error);
            });
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
            logger.error("Error during getting all data from MongoDb: ", error.message);
            return Promise.reject(error);

            // TODO: change to error builder with an error message
        });
}


module.exports = {
    scrubOrReturnData,
    getAllLinks
};