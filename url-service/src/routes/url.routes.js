const express = require("express")
const URLController = require("../controllers/url.controller")
const AuthmiddleWare=require("../middlewares/auth.middleware")

const router = express.Router()



router.post("/urls",AuthmiddleWare.UserAuth,URLController.ShortURL)
router.get("/urls",AuthmiddleWare.UserAuth,URLController.GetMyURLs)
router.get("/urls/:id",AuthmiddleWare.UserAuth,URLController.GetMyURLsByID)
router.put("/urls/:id",AuthmiddleWare.UserAuth,URLController.UpdateURL)
router.delete("/urls/:id",AuthmiddleWare.UserAuth,URLController.DeleteURL)





module.exports = router