require("dotenv").config()
const app = require("../src/app.js")
const Connect = require("../src/config/db.config.js")
const dns = require(`dns`)
dns.setServers(["1.1.1.1", "8.8.8.8"])

Connect()

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
    console.log(`URL Shortener Service is running at Port ${PORT}`);
});

server.on("error", (error) => {
    console.error("Internal Server Error:", error);
});




