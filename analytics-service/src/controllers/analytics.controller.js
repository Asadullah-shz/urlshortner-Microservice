const express = require("express")
const { createClickRecord } = require("../services/click.service");
const AnalyticsModel = require("../models/analytics.model");

async function RecordClick(req, res) {
    try {
        
        const { shortCode, urlId, userID } = req.body;
        console.log("Analytics RecordClick body:", req.body);

        
        const newClick = await createClickRecord({ shortCode, urlId, userID });
        
      
        return res.status(201).json({ 
            success: true, 
            message: "Click recorded successfully", 
            data: newClick 
        });

    } catch (error) {
        console.error("Error recording click:", error);
        
 
        if (error.message.includes("Missing required fields")) {
            return res.status(400).json({ 
                success: false, 
                message: error.message 
            });
        }


        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
}

async function ShortCodeFetch(req, res) {
    try {
        const userID = req.user?.id;
        const { shortCode } = req.params;

        if (!userID) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        
        if (!shortCode) {
            return res.status(400).json({ success: false, message: "shortCode parameter is required" });
        }

        const clickCount = await AnalyticsModel.countDocuments({ shortCode, userID });
        
        return res.status(200).json({
            success: true,
            message: "ShortCode clicks fetched successfully",
            data: {
                shortCode,
                totalClicks: clickCount
            }
        });
    } catch (error) {
        console.error("Error fetching shortCode analytics:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


module.exports = { RecordClick,ShortCodeFetch }