const URLmodel = require('../models/url');

async function createShortURL(userID, originalURL, customAlias = null) {
    const { createUniqueShortCode } = require('./shortCode.service');
    
    let shortCode = customAlias;
    if (shortCode) {
        const existing = await URLmodel.findOne({ shortCode });
        if (existing) {
            throw new Error('Custom alias already in use');
        }
    } else {
        shortCode = await createUniqueShortCode();
    }

    const newUrl = await URLmodel.create({
        userID,
        originalURL,
        shortCode,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return newUrl;
}

module.exports = { createShortURL };
