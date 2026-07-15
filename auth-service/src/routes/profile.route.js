const express = require("express")
const multer = require("multer")
const ProfileController = require("../controller/profile.controller")
const AuthMiddleware = require("../middleware/auth.middleware")
const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })



router.get("/profile", AuthMiddleware.UserAuth, ProfileController.Profile)
router.patch("/updateprofile", AuthMiddleware.UserAuth, upload.single("profileImage"), ProfileController.UpdateProfile)



module.exports=router
