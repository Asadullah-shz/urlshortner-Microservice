require("dotenv").config();
const jwt = require("jsonwebtoken");

async function UserAuth(req, res, next) {
    try {

        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid Credinatls" });
        }

     
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        req.user = decoded;

      
        next();
    } catch (error) {

        console.error("User Auth Error:", error);
        return res.status(401).json({ message: "Internal Server Error" });
    }
}

async function AdminAuth(req, res, next) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid Credinatls" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        if(decoded.role !== "Admin") {
            return res.status(403).json({ message: "You do not have access" });
        }
        req.user = decoded;

        next();
    } catch (error) {

        console.error("Admin Auth Error:", error);
        return res.status(401).json({ message: "Internal Server Error" });
    }
}

module.exports = { UserAuth, AdminAuth };
