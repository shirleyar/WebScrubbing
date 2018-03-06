module.exports = {
    APP_NAME: process.env.APP_NAME || "Web Scrubbing",
    PORT: process.env.PORT || 8080,

    ABSOLUTE_LINKS_REGEX: "a[href^='http']",
    LINK_ATTR_NAME: "href"
};