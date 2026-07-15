require("dotenv").config();
const { createShortURL } = require("../services/url.service");
const { validateURL } = require("../utils/validators");
const response = require("../utils/response");
const urlDB = require("../model/url");

async function ShortURL(req, res, next) {
    try {
        const { originalURL, customAlias } = req.body;
        const userID = req.user?.id;

        if (!originalURL) {
            return response(res, 400, false, "Original URL is required");
        }

        if (!validateURL(originalURL)) {
            return response(res, 400, false, "Invalid URL format");
        }

        const newUrl = await createShortURL(userID, originalURL, customAlias);

        return response(res, 201, true, "Short URL created successfully", newUrl);

    } catch (error) {
        if (error.message === 'Custom alias already in use') {
            return response(res, 409, false, error.message);
        }
        next(error);
    }
}

async function GetMyURLs(req, res) {
    try {
        const userID = req.user?.id;

        if (!userID) {
            return response(res, 401, false, "Unauthorized");
        }

       
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const result = await urlDB.find({ userID }).skip(skip).limit(limit);
        
        if (!result || result.length === 0) {
            return response(res, 404, false, "No URLs Found");
        }
        
        return response(res, 200, true, "URLs Fetched Successfully", result);
    } catch (error) {
        console.error(error);
        return response(res, 500, false, "Internal Server Error");
    }
}

async function GetMyURLsByID(req, res) {
    try {
        const userID = req.user?.id;

        if (!userID) {
            return response(res, 401, false, "Unauthorized");
        }

    
        const result = await urlDB.findOne({ _id: req.params.id, userID });
        
        if (!result) {
            return response(res, 404, false, "No Data is Found About This User");
        }
        
        return response(res, 200, true, "URL Fetched Successfully", result);
    } catch (error) {
        console.error(error);
        return response(res, 500, false, "Internal Server Error");
    }
}

async function UpdateURL(req, res) {
    try {
        const { originalURL, customAlias, status } = req.body;
        const userID = req.user?.id;

        if (!userID) {
            return response(res, 401, false, "Unauthorized");
        }

        const filter = { 
            _id: req.params.id,
            userID: userID 
        };

        const result = await urlDB.findOneAndUpdate(filter, {
            originalURL, 
            customAlias,
            status,
        }, { new: true }); 
        
        if (!result) {
            return response(res, 404, false, "URL not found or you do not have permission to update it");
        }
        
        return response(res, 200, true, "URL Updated Successfully", result);
    } catch (error) {
        console.error(error);
        return response(res, 500, false, "Internal Server Error");
    }
}

async function DeleteURL(req, res) {
    try {
        const userID = req.user?.id; 

        if (!userID) {
            return response(res, 401, false, "Unauthorized");
        }

        const filter = { 
            _id: req.params.id,
            userID: userID 
        };

        
        const result = await urlDB.findOneAndDelete(filter); 
        
        if (!result) {
            return response(res, 404, false, "URL not found Related to This ID");
        }
        
        return response(res, 200, true, "URL Deleted Successfully", result);
    } catch (error) {
        console.error(error);
        return response(res, 500, false, "Internal Server Error");
    }
}

module.exports = { ShortURL, GetMyURLs, GetMyURLsByID, UpdateURL, DeleteURL };