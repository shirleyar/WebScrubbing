'use strict';

const request = require('request-promise'),
    cheerio = require('cheerio'),
    logger = require('./logger'),
    constants = require('./constants'),
    ABSOLUTE_LINKS_REGEX = constants.ABSOLUTE_LINKS_REGEX,
    LINK_ATTR_NAME = constants.LINK_ATTR_NAME;

module.exports.getLinks = function (uri) {
    return new Promise((resolve, reject) => {
        let options = {
            uri: uri,
            transform: body => {
                return cheerio.load(body);
            }
        };
        return request(options)
            .then($ => {
                let linksSet = new Set();
                let absoluteLinks = $(ABSOLUTE_LINKS_REGEX);
                $(absoluteLinks).each((i, link) => {
                    linksSet.add($(link).attr(LINK_ATTR_NAME));
                });
                resolve(Array.from(linksSet));
            }).catch(error => {
                logger.error("Error during scrubbing: %s", error.message);
                reject(error);
            })
    })
};
