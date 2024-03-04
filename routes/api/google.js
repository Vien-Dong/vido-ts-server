const express = require("express");
const { getAppDetails, getDateUpdated } = require("../../services/google-service");
const router = express.Router();
// const gplay = require("google-play-scraper");
const { default: axios } = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");

router.get('/get-app-details', async (req, res) => {
    try {
        const result = await getAppDetails();
        res.status(200).send({
            status: true,
            message: "Lấy thông tin thành công.",
            payload: result.data
        });
    }
    catch (err) {
        res.status(400).send({
            status: false,
            message: "Lỗi hệ thống.",
        });
        console.log(err);
    }
});

router.get('/get-details/:package', async (req, res) => {
    try {
        const package = req.params.package;
        const result = await getDateUpdated(package);
        res.status(200).send({
            status: true,
            message: "Lấy thông tin thành công.",
            shouldUpdate: result
        });
    }
    catch (err) {
        res.status(400).send({
            status: false,
            message: "Lỗi hệ thống.",
        });
        console.log(err);
    }
});

// router.get("/get-details-from-db", async (req, res) => {
//     try {
//         const { package } = req.body;
//         const version = await Message.find({ "roomId": roomId });

//         res.status(200).send(messages);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

module.exports = router;