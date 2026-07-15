const express = require("express")
const AdminController = require("../controller/admin_url.controller")
const AuthmiddleWare=require("../middleware/auth.middleware")

const router = express.Router()




router.get("/admin/urls",AuthmiddleWare.AdminAuth,AdminController.AdminGetAllURLs)
router.get("/admin/urls/:id",AuthmiddleWare.AdminAuth,AdminController.AdminGetURLByID)
router.put("/admin/urls/:id",AuthmiddleWare.AdminAuth,AdminController.AdminUpdateURL)
router.delete("/admin/urls/:id",AuthmiddleWare.AdminAuth,AdminController.AdminDeleteURL)


module.exports=router