const mongoose = require("mongoose")
const urlDB = require("../config/db")


const URLSchema = new mongoose.Schema({


    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    originalURL: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    shortCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    clickCount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["active", "inactive,Disabled,Expired"],
        default: "active"
    },
    createdAt: {
        type: Date,

    },
    updatedAt: {
        type: Date
    }

})



module.exports = mongoose.model("URL", URLSchema)