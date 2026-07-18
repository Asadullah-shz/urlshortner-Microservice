const express = require("express");
const { verifyAuth } = require("../middlewares/auth.middleware")
const analyticsProxy = require("../config/analytics.proxy");

const router = express.Router();

router.post("/click", analyticsProxy);
router.use("/", verifyAuth, analyticsProxy);

module.exports = router;
