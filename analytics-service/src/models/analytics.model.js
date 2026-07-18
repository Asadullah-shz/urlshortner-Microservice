const mongoose = require("mongoose")


const AnalyticsSchema = new mongoose.Schema({
    
    urlId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "URL",
    },

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    shortCode: {
        type: String,
        required: true
    },
    clickedAt: {
        type: Date,
        default: Date.now
    }

})

const AnalyticsModel = mongoose.model("Analytics", AnalyticsSchema)


module.exports = AnalyticsModel