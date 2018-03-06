'use strict';

const request = require('request'),
    cheerio = require('cheerio'),
    // format = require('util').format,
    logger = require('./logger'),
    constants = require('./constants'),
    ABSOLUTE_LINKS_REGEX = constants.ABSOLUTE_LINKS_REGEX,
    LINK_ATTR_NAME = constants.LINK_ATTR_NAME;

module.exports.getLinks = function (url) {
    return new Promise((resolve, reject) => {
        let linksSet = new Set();
        return request(url, (error, response, html) => {
            if (error) {
                logger.error(error.message);
                reject(error);
            } else {
                let $ = cheerio.load(html);
                let absoluteLinks = $(ABSOLUTE_LINKS_REGEX);
                $(absoluteLinks).each((i, link) => {
                    linksSet.add($(link).attr(LINK_ATTR_NAME));
                });
                resolve(linksSet);
            }
        });
    });
    // let relativeLinks = $("a[href^='/']");
    // $(absoluteLinks).each((i, link) => {
    //     linksSet.add(format('%s%s',url,$(link).attr('href')));
    // });
};

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