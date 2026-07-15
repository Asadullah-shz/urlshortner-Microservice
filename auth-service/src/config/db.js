require("dotenv").config()
const mongoose=require("mongoose")


async function AuthDB() {

    try {
         
        await mongoose.connect(process.env.MONGO_URL)
    
    console.log("Auth DB Connected Successfully")

    } catch (error) {
        
        console.error("Error connecting to Auth DB:", error)
        process.exit(1)
    }


    
}


module.exports=AuthDB