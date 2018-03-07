'use strict';

const request = require('request'),
    validatedLinkModel = require('../Models/validated-link-model');

module.exports.validate = function (link) {
    request(link, (error, response)=> {
       return Promise.resolve(validatedLinkModel(link, _.isEmpty(error)));
    });
};

