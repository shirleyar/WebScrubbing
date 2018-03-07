'use strict';
const _ = require('lodash'),
    logger = require('../Helpers/logger');

module.exports = function (origin, links, idempotency_key) {
    if (!_.isArray(links)) {
        throw ("links is not an array");
    }

    let linksObj = {
        origin: origin,
        time: Date.now(),
        idempotency_key: idempotency_key,
        links: links,
    };

    logger.info('Built a links object for link: ', origin);
    logger.debug('Built a links object: %j', linksObj);
    return linksObj;
};
