const AnalyticsModel = require("../models/analytics.model");

async function createClickRecord({ shortCode, urlId, userID }) {

    if (!shortCode || !urlId || !userID) {
        throw new Error("Missing required fields (shortCode, urlId, userID)");
    }

    const newClick = await AnalyticsModel.create({
        urlId: urlId,
        userID: userID,
        shortCode: shortCode
    });

    return newClick;
}

module.exports = { createClickRecord };
