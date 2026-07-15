require("dotenv").config()
const app = require("../src/app.js")
const URLDB = require("../src/config/db.js")
const dns = require(`dns`)
dns.setServers(["1.1.1.1", "8.8.8.8"])

URLDB()

const PORT = process.env.PORT

app.listen(PORT, () => {
    try {

        console.log(`URL Shortener Service Started on Port`, PORT)

    }
    catch (error) {

        console.error("Error", error)
    }
})