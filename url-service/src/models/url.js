const mongoose = require("mongoose")


const URLSchema = new mongoose.Schema({


    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
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