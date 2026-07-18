const express=require("express")
const cors = require("cors")
const morgan = require("morgan")
const authRoutes = require("./routes/auth.routes")
const urlRoutes = require("./routes/url.routes")
const analyticsRoutes = require("./routes/analytics.routes")
const  rateLimit = require("./middlewares/ratelimit")
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware")


const app=express()
app.use(rateLimit)
app.use(cors())
app.use(morgan("dev"))
app.use(express.json({ limit: "10kb" }))



app.use("/api/auth", authRoutes)
app.use("/api/urls", urlRoutes)
app.use("/api/analytics", analyticsRoutes)



app.get("/health", (req, res) => {
    res.status(200).json({ status: "Gateway is up and running!" });
});

app.use(notFoundHandler);
app.use(errorHandler);


module.exports=app