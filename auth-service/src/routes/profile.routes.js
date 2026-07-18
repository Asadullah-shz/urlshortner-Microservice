const express = require("express")
const multer = require("multer")
const ProfileController = require("../controllers/profile.controller")
const AuthMiddleware = require("../middlewares/auth.middleware")
const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })



router.get("/profile", AuthMiddleware.UserAuth, ProfileController.Profile)
router.patch("/updateprofile", AuthMiddleware.UserAuth, upload.single("profileImage"), ProfileController.UpdateProfile)



module.exports=router
