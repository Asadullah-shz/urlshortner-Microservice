const express = require("express");
const { verifyAuth } = require("../middlewares/auth.middleware")
const urlProxy = require("../config/url.proxy");


const router = express.Router();

router.use("/", verifyAuth, urlProxy);

module.exports = router;