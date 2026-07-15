const ImageKit = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
   
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

})


async function uploadFile(file) {
   

    const upload = ImageKitClient.files.upload({
        file,
        fileName: "profile_pic_" + Date.now(), 
        folder: "microservice/profile"
    })
    return upload
}


 module.exports={uploadFile}