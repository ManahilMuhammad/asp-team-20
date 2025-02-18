const result = require("dotenv").config();

if (result.error) {
    console.warn(`[WARN] Unable to to load .env file ${result.error.message || 'no details available'} defaulting to base values`)
} else if (Object.keys(result.parsed) === 0) {
    console.warn('[WARN] No keys found in the .env file, the system will default to fallback values');
}

const { env } = process;

// Validate NODE_ENV
let NODE_ENV = 'development';
if (
    env.NODE_ENV === 'production' ||
    env.NODE_ENV === 'test' ||
    env.NODE_ENV === 'development'
) NODE_ENV = env.NODE_ENV;
else console.warn(`[WARN] NODE_ENV was incorrectly set in the .env file to ${env.NODE_ENV}, defaulting to "development"`);

// Validate server port
let PORT = 3000;
if (
    typeof env.PORT === 'number'
) PORT = env.PORT;
else console.warn(`[WARN] PORT was incorrectly set in the .env file to ${env.NODE_ENV}, defaulting to 3000`)

module.exports = {
    NODE_ENV,
    PORT,
}