'use strict';

const linksModel = require('../Models/links-model'),
    scrubber = require('../Helpers/scrubber'),
    linkValidator = require('../Helpers/link-validator'),
    MongoDbConnector = require('../Connectors/MongoDB-connector'),
    logger = require('../Helpers/logger'),
    _ = require('lodash');

function scrubOrReturnData(link, idempotency_key) {
    return new Promise((resolve, reject) => {
        logger.info("Checking if repeating request");
        return MongoDbConnector.getLinksByOriginAndIdempotencyKey(link, idempotency_key)
            .then(result => {
                if (_.isEmpty(result)) {
                    logger.info("Not repeating. starting scrub and save process.");
                    resolve(scrubWebPageAndSave(link, idempotency_key));
                } else {
                    logger.info("Repeating request. Returning existing object from database");
                    logger.debug("Requested link and idempotency key already saved, returned saved link object");
                    resolve(result[0]);
                }
            }).catch(error => {
                logger.error('Error during scrub or return saved data: ', error.message);
                reject(error);
            })
    })
}

function scrubWebPageAndSave(link, idempotency_key) {
    let linkObj;
    return new Promise((resolve, reject) => {
        logger.info("scrubbing web page: ", link);
        return scrubber.getLinks(link)
            .then(links => {
                logger.info("Scrubbed web page successfully. Validating all scrubbed links. count: ", links.length);
                return Promise.all(links.map(linkValidator.validate))
            }).then(validatedLinks => {
                logger.info("Validated links. Saving to database");
                linkObj = linksModel.buildObj(link, validatedLinks, idempotency_key);
                return MongoDbConnector.saveLinks(linkObj)
            }).then(() => {
                logger.info ("saved successfully.");
                resolve(linkObj)
            }).catch(error => {
                logger.error("Error during scrub or save: ", error.message);
                reject(error);
            });
    });
}

function getAllLinks() {
    logger.info("Fetching all data in database");
    return MongoDbConnector.getAllLinks()
        .then(data => {
            logger.info("Filtering saved links");
            let allLinks = [];
            data.forEach(originLink => {
                let links = originLink.links.map(linkInOrigin => linkInOrigin.link);
                allLinks = _.union(allLinks, links);
            });
            logger.info("Total links in database: ", allLinks.length);
            return Promise.resolve(allLinks);
        }).catch(error => {
            logger.error("Error during getting all data from MongoDb: ", error.message);
            return Promise.reject(error);
        });
}


module.exports = {
    scrubOrReturnData,
    getAllLinks
};