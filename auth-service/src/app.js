const express = require("express")
const cookieParser = require("cookie-parser")
const AuthRoute = require("./routes/auth.route")
const ProfileRoute=require("./routes/profile.route")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/auth", AuthRoute)
app.use(ProfileRoute)

module.exports = app