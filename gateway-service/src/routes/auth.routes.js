const express = require("express");
const authProxy = require("../config/auth.proxy");


const router = express.Router();

router.use("/", authProxy);

module.exports = router