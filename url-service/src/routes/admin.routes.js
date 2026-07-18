const express = require("express")
const AdminController = require("../controllers/admin.controller")
const AuthmiddleWare=require("../middlewares/auth.middleware")

const router = express.Router()




router.get("/admin/urls",AuthmiddleWare.AdminAuth,AdminController.AdminGetAllURLs)
router.get("/admin/urls/:id",AuthmiddleWare.AdminAuth,AdminController.AdminGetURLByID)
router.put("/admin/urls/:id",AuthmiddleWare.AdminAuth,AdminController.AdminUpdateURLByID)
router.delete("/admin/urls/:id",AuthmiddleWare.AdminAuth,AdminController.AdminDeleteURLByID)


module.exports=router