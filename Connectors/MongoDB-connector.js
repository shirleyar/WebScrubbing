'use strict';

const MongoClient = require('mongodb').MongoClient,
    format = require('util').format,
    _ = require('lodash'),
    logger = require('../Helpers/logger'),
    constants = require('../Helpers/constants'),
    MONGODB_URL = format(constants.MONGODB_URL, constants.MONGODB_USER, constants.MONGODB_PASSWORD),
    MONGODB_COLLECTION_NAME = constants.MONGODB_COLLECTION_NAME;

var database, collection;

function connect() {
    return MongoClient.connect(MONGODB_URL, (error, client) => {
        if (error) {
            logger.error(error);
            return Promise.reject(error);
        }
        database = client.db(constants.MONGODB_DB_NAME);
        collection = database.collection(MONGODB_COLLECTION_NAME);
        logger.info('MongoDb connected successfully');
        return Promise.resolve();
    });
}

function getAllLinks() {
    collection.find({}).toArray((error, result) => {
        if (error) {
            logger.error(error);
            return Promise.reject(error);
        }
        logger.info('Fetched from DB all documents');
        logger.debug('Fetched from DB all documents: %j', result);
        return Promise.resolve(result);
    })
}

function getLinksByOriginAndIdempotencyKey (origin_link, idempotency_key) {
    let query = {origin: origin_link, idempotency_key: idempotency_key};
    collection.find(query).toArray((error, result) => {
        if (error) {
            logger.error(error);
            return Promise.reject(error);
        }
        logger.info('Fetched from DB by origin link and idempotency key');
        logger.debug('Fetched from DB by origin link and idempotency key: %j', result);
        return Promise.resolve(result);
    })

}

function saveLinks(data) {
    if (_.isEmpty(data)) {
        logger.error(constants.ERROR_DATA_IS_EMPTY);
        return Promise.reject(constants.ERROR_DATA_IS_EMPTY);
    }
    collection.insert(data, (error,result) => {
        if (error) {
            logger.error(error);
            return Promise.reject(error);
        }
        logger.info('Data inserted to db');
        logger.debug('Data inserted to db: %j, data');
        return Promise.resolve(result);
    })
}