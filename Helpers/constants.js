module.exports = {
    // General
    APP_NAME: process.env.APP_NAME || "Web Scrubbing",
    LOG_LEVEL: "info",
    PORT: process.env.PORT || 3000,
    VERSION: process.env.VERSION || 'v1',
    BASE_URL: process.env.BASE_URL || "/webScrubbing/api",
    URL_REGEX: "/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/",

    // DB related
    // Should all be hidden and saved as environment variable (security matters and stuff) but since this is merely a home assignment and there's nothing important saved (DB will probably be erased once done)
    // didn't bother to hide.
    MONGODB_USER: process.env.MONGODB_USER || 'scrubApp',
    MONGODB_PASSWORD: process.env.MONGODB_PASS || "123456",
    MONGODB_URL: 'mongodb://%s:%s@ds259258.mlab.com:59258/web-scrubbing-links',
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "web-scrubbing-links",
    MONGODB_COLLECTION_NAME: process.env.MONGODB_COLLECTION_NAME || "links",


    // scrubbing related
    ABSOLUTE_LINKS_REGEX: "a[href^='http']",
    LINK_ATTR_NAME: "href",

    // errors
    ERROR_DATA_IS_EMPTY: "Error. Input in function is empty.",
    ERROR_INVALID_PARAMETERS: "Error. At least one invalid parameter. url: %s , idempotency_key: %s",
    ERROR_WRONG_PATH: "Error. Path not found. method: %s , url: %s",
    ERROR_SOMETHING_WENT_WRONG: "Error. Something went wrong. Check logs for more information."
};