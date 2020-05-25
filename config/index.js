require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_SEARCH_PLACE_API_KEY: process.env.GOOGLE_SEARCH_PLACE_API_KEY,
    GOOGLE_SEARCH_PLACE_API_BASE_URL: process.env.GOOGLE_SEARCH_PLACE_API_BASE_URL,
}