const result = require("dotenv").config();

if (result.error) {
    console.warn(`[WARN] Unable to to load .env file ${result.error.message || 'no details available'} defaulting to base values`)
} else if (Object.keys(result.parsed) === 0) {
    console.warn('[WARN] No keys found in the .env file, the system will default to fallback values');
}

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
}