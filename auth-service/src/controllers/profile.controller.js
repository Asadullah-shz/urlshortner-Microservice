require("dotenv").config()
const Usermodel = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { uploadFile } = require("../services/storage.service")



async function Profile(req, res) {
    try {
        const result = await Usermodel.findById(req.user.id).select("-password");

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile Data has been Fetched ",
            data: result
        })

    } catch (error) {
        console.error("Profile Error:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function UpdateProfile(req, res) {
    try {
        const userId = req.user.id;
        const updateData = { ...req.body };

        if (req.file) {
            const base64String = req.file.buffer.toString("base64");
            const uploadPic = await uploadFile(base64String);
            updateData.profileImage = uploadPic.url;
        }

        const updatedUser = await Usermodel.findByIdAndUpdate(
            userId,
            {
                username: updateData.username,
                profileImage: updateData.profileImage
            },
            { returnDocument: 'after' }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        updatedUser.password = undefined;

        return res.status(200).json({
            message: "Profile updated successfully",
            data: updatedUser
        });

    } catch (error) {
        console.error("Update Profile Error:", error);
        return res.status(500).json({
            message: "Failed to update profile",
            error: error.message
        });
    }
}

module.exports = { Profile, UpdateProfile }