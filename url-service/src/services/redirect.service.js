const URLmodel = require('../models/url');

async function handleRedirect(shortCode) {
    const urlData = await URLmodel.findOne({ shortCode, status: 'active' });
    
    if (!urlData) {
        return null;
    }

    urlData.clickCount += 1;
    await urlData.save();

    return urlData.originalURL;
}

module.exports = { handleRedirect };
