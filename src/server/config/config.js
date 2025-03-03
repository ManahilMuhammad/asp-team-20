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
const parsedPort = Number(env.PORT);
if (
    typeof env.PORT === "number" || (!isNaN(parsedPort) && parsedPort > 0)
) PORT = Number(env.PORT);
else console.warn(`[WARN] PORT was incorrectly set in the .env file to ${Number(env.PORT)}, defaulting to 3000`);

const generateRandomString = (length) => {
    if (!length || typeof length !== 'number' || length < 0 || length > 50) length = 20;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
};

let JWT_SECRET;
if (
    typeof env.JWT_SECRET === 'string' &&
    env.JWT_SECRET.length >= 10
) JWT_SECRET = env.JWT_SECRET;
else {
    console.warn('[WARN] no valid JWT_SECRET is provided, generating a new one of length 20');
    JWT_SECRET = generateRandomString(20);
}

let SPOONACULAR_APIKEY;
if (
    typeof env.SPOONACULAR_APIKEY === 'string' &&
    env.SPOONACULAR_APIKEY.length >= 10
) SPOONACULAR_APIKEY = env.SPOONACULAR_APIKEY;
else {
    console.warn('[WARN] no valid SPOONACULAR_APIKEY is provided, the API won\'t work !');
}

module.exports = {
    NODE_ENV,
    PORT,
    JWT_SECRET,
    SPOONACULAR_APIKEY
}
