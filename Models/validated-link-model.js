'use strict';

module.exports = function (link, isWorking = false) {
    return {
        link: link,
        valid: isWorking
    }
};