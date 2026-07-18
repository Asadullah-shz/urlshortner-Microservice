require("dotenv").config()
const URLDB = require("../models/url")
const response = require("../utils/response")


async function AdminGetAllURLs(req, res) {
    try {

        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

       
        const result = await URLDB.find().skip(skip).limit(limit);

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

        const result = await URLDB.findById(req.params.id);

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

async function AdminUpdateURLByID(req, res) {
    try {
        const { originalURL, customAlias, status } = req.body;


        const result = await URLDB.findByIdAndUpdate(
            req.params.id,
            {
                originalURL,
                customAlias,
                status
            },
            { returnDocument: 'after' }
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

async function AdminDeleteURLByID(req, res) {
    try {

        const result = await URLDB.findByIdAndDelete(req.params.id);

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

module.exports = {  AdminGetAllURLs, AdminGetURLByID, AdminUpdateURLByID, AdminDeleteURLByID };