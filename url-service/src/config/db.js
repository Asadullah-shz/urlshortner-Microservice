require("dotenv").config()
const mongoose=require("mongoose")


async function URLDB() {

    try {
         
        await mongoose.connect(process.env.MONGO_URL)
    
    console.log("URL DB Connected Successfully")

    } catch (error) {
        
        console.error("Error connecting to URL DB:", error)
        process.exit(1)
    }


    
}


module.exports=URLDB