'use strict';

const request = require('request-promise'),
    cheerio = require('cheerio'),
    // format = require('util').format,
    logger = require('./logger'),
    constants = require('./constants'),
    ABSOLUTE_LINKS_REGEX = constants.ABSOLUTE_LINKS_REGEX,
    LINK_ATTR_NAME = constants.LINK_ATTR_NAME;

module.exports.getLinks = function (uri) {
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
            return Promise.resolve(Array.from(linksSet));
        }).catch(error => {
            logger.error(error);
            return Promise.reject(error);
        })
};
// let relativeLinks = $("a[href^='/']");
// $(absoluteLinks).each((i, link) => {
//     linksSet.add(format('%s%s',url,$(link).attr('href')));
// });
// function formatRelativeLink(url, path) {
//     let link;
//
//     if (url.slice(-1) === '/') {
//         link = url.substr(0, url.length-1);
//     }
//
//     while ('')
//     return link;
// }