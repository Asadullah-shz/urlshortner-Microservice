const express=require("express")
const cookieParser = require("cookie-parser")
const URLRouter=require("./routes/url.routes")
const AdminRouter=require("./routes/admin.routes")

const app=express()

app.use(express.json())
app.use(cookieParser())

app.use(URLRouter)
app.use(AdminRouter)

const errorMiddleware = require("./middlewares/error.middleware")
app.use(errorMiddleware)

module.exports=app