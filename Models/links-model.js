'use strict';
const _ = require('lodash'),
    logger = require('../Helpers/logger');

module.exports.buildObj = function (origin, links, idempotency_key) {
    if (!_.isArray(links)) {
        logger.error("links parameter for model is not an array: ", links);
        throw ("links parameter is not an array");
    }

    let linksObj = {
        origin: origin,
        time: new Date().toUTCString(),
        idempotency_key: idempotency_key,
        links: links,
    };

    logger.info('Built a link object for link: ', origin);
    logger.debug('Built link object: %j', linksObj);
    return linksObj;
};
