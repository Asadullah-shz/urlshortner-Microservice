const dns = require(`dns`)
const app=require("./app")
const AuthDB=require("./config/db")

dns.setServers(["1.1.1.1", "8.8.8.8"])

AuthDB()

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log("Service is Running at Port",PORT)
})


