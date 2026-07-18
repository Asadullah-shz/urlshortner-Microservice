const express = require("express")
const AnalyticsController = require("../controllers/analytics.controller")
const AuthmiddleWare = require("../middlewares/auth.middleware")


const router = express.Router();

router.post("/click", AnalyticsController.RecordClick)
router.get("/:shortCode", AuthmiddleWare.UserAuth, AnalyticsController.ShortCodeFetch)




module.exports = router