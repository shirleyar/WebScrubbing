'use strict';

const request = require('request-promise'),
    validatedLinkModel = require('../Models/validated-link-model');

module.exports.validate = function (link) {
    return new Promise((resolve, reject) => {
        return request.get(link)
            .then(response=>{
                resolve (validatedLinkModel(link, true));
            }).catch(error =>{
                resolve (validatedLinkModel(link, false));
            }
        );
    });
};

