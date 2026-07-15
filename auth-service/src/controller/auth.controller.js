require("dotenv").config()
const Usermodel = require("../model/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { uploadFile } = require("../services/storage.service")

async function Register(req, res) {
    try {
        const { username, email, password, role } = req.body

        const isAlreadyExist = await Usermodel.findOne({ email })
        if (isAlreadyExist) {
            return res.status(409).json({
                message: "User Already Exist",
                data: isAlreadyExist.email
            })
        }

        
        let profileImageUrl = "";
        if (req.file) {
           
            const base64String = req.file.buffer.toString("base64");
            const image = await uploadFile(base64String);
            profileImageUrl = image.url;
        }

        const hash = await bcrypt.hash(password, 10)

        const result = await Usermodel.create({
            username,
            email,
            password: hash,
            role,
            profileImage: profileImageUrl 
        })

        const token = jwt.sign({
            id: result._id,
            role:result.role
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        return res.status(201).json({
            message: "User Registered Successfully",
            token:token
        })
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({
            message: "Internal Server Error during Registration",
            error: error.message
        });
    }
}

async function Login(req, res) {

    const { username, email, password } = req.body

    try {
        
        const isUserExist = await Usermodel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        if (!isUserExist) {
            return res.status(409).json({
                message: "No user exist with this username or email ",
                email
            })
        }

        const isPasswordValid = await bcrypt.compare(password, isUserExist.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Credientals"
            })
        }

        const token = jwt.sign({
            id: isUserExist._id,
            role: isUserExist.role
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(200).json({
            message: "User Logged in Sucessfully",
            token: token,
        })

    }
   catch (error) {
    console.error(" Server Error occurred. Please try again later", error)
    return res.status(500).json({ message: "Internal server error" })
}

}

async function Logout(req, res) {

    res.clearCookie("token")

    res.status(200).json({
        message: "Sucessfully Logout"
    })
}




module.exports = { Register, Login, Logout }