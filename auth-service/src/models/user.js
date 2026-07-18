const mongoose = require("mongoose")
const AuthDatabase = require("../config/authdb")


const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    profileImage: {
        type: String
    },

    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },

    accountStatus: {
        type: String,
        default: "Active"
    }

}, {
    timestamps: true

})


module.exports = mongoose.model("Users", UserSchema)