const express = require("express")
const AuthController = require("../controller/auth.controller")
const multer=require("multer")
const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })


router.post("/register",upload.single("profileImage"),AuthController.Register)
router.post("/login",AuthController.Login)
router.post("/logout",AuthController.Logout)




module.exports = router