const express=require("express")
const cookieParser = require("cookie-parser")
const URLRouter=require("./routes/url.route")

const app=express()

app.use(express.json())
app.use(cookieParser())

app.use(URLRouter)

const errorMiddleware = require("./middleware/error.middleware")
app.use(errorMiddleware)

module.exports=app