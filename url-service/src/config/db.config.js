require("dotenv").config()
const mongoose = require("mongoose")


const Connect = async function URLDatabase() {

    try {

        const connection = await mongoose.connect(process.env.MONGO_URL)

        console.log("URL DB Connected Successfully")

        return connection

    } catch (error) {

        console.error("Error connecting to URL DB:", error)
        process.exit(1)
    }



}


module.exports = Connect