const URLmodel = require('../models/url');
const generateShortCode = require('../utils/generateShortCode');

async function createUniqueShortCode() {
    let isUnique = false;
    let shortCode;

    while (!isUnique) {
        shortCode = generateShortCode(6);
        const existingURL = await URLmodel.findOne({ shortCode });
        if (!existingURL) {
            isUnique = true;
        }
    }
    return shortCode;
}

module.exports = { createUniqueShortCode };
