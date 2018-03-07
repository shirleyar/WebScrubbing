'use strict';

module.exports = function (link, isWorking) {
    return {
        link: link,
        valid: isWorking
    }
};