module.exports = {
    // General
    APP_NAME: process.env.APP_NAME || "Web Scrubbing",
    PORT: process.env.PORT || 3000,
    VERSION: process.env.VERSION || 'v1',
    BASE_URL: process.env.BASE_URL || "/webScrubbing/api",

    // DB related
    MONGODB_USER: process.env.MONGODB_USER || 'admin',
    MONGODB_PASSWORD: process.env.MONGODB_PASS || "?yB=Q>C74N!!Evk6Q3!@VCAPAZ@pe-Uw",
    MONGODB_URL: 'mongodb://%s:%s@ds259258.mlab.com:59258/web-scrubbing-links',
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "scrubbed_links",
    MONGODB_COLLECTION_NAME: process.env.MONGODB_COLLECTION_NAME || "links",


    // scrubbing related
    ABSOLUTE_LINKS_REGEX: "a[href^='http']",
    LINK_ATTR_NAME: "href",

    // errors
    ERROR_DATA_IS_EMPTY: "Error. Input in function is empty.",

};