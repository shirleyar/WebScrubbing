'use strict';

const express = require('express'),
    router = express.Router(),
    controller = require('../Controllers/links-controller');

router.get('/links', controller.getLinks);

router.post('/link', controller.postLink);

router.all('*', controller.wrongPath);


module.exports = router;
