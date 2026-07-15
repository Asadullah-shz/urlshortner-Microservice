require("dotenv").config()
const URLDB = require("../model/url")
const response = require("../utils/response")


async function AdminGetAllURLs(req, res) {
    try {

        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

       
        const result = await urlDB.find({}).skip(skip).limit(limit);

        if (!result || result.length === 0) {
            return response(res, 404, false, "No URLs Found");
        }

        return response(
            res, 200,
            true,
            "All URLs Fetched Successfully",
            result
        );
    } catch (error) {
        console.error(error);
        return response(res, 500,false,"Internal Server Error"
        );
    }
}

async function AdminGetURLByID(req, res) {
    try {

        const result = await urlDB.findById(req.params.id);

        if (!result) {
            return response(res, 404, false, "No Data is Found Related to This ID"
            );
        }

        return response(res, 200, true, "URL Fetched Successfully", result);

    } catch (error) {
        console.error(error);
        return response(res, 500, false, "Internal Server Error");
    }
}

async function AdminUpdateURL(req, res) {
    try {
        const { originalURL, customAlias, status } = req.body;


        const result = await urlDB.findByIdAndUpdate(
            req.params.id,
            {
                originalURL,
                customAlias,
                status
            },
            { new: true }
        );

        if (!result) {
            return response(res, 404, false, "URL not found");
        }

        return response(res, 200, true, "URL Updated Successfully", result);
        
    } catch (error) {
        console.error(error);
        return response(res, 500, false, "Internal Server Error");
    }
}

async function AdminDeleteURL(req, res) {
    try {

        const result = await urlDB.findByIdAndDelete(req.params.id);

        if (!result) {
            return response(res, 404, false, "URL not found Related to This ID"
        );
        }

        return response(res, 200, true, "URL Deleted Successfully", result);

    } catch (error) {
        console.error(error);
        return response(res, 500, false, "Internal Server Error");
    }
}

module.exports = {  AdminGetAllURLs, AdminGetURLByID, AdminUpdateURL, AdminDeleteURL };