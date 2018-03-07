'use strict';

const request = require('request-promise'),
    validatedLinkModel = require('../Models/validated-link-model'),
    logger = require('../Helpers/logger');

module.exports.validate = function (link) {
    return new Promise((resolve, reject) => {
        return request.get(link)
            .then(response => {
                logger.debug('validation check for %s returned true', link);
                resolve(validatedLinkModel(link, true));
            }).catch(error => {
                logger.debug('validation check for %s returned false', link);
                resolve(validatedLinkModel(link, false));
                }
            );
    });
};

