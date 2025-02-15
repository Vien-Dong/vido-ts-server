const express = require("express");
const { crawlData } = require("../../services/website-service");
const router = express.Router();

router.get("/crawl", async (req, res) => {
    try {
        const result = await crawlData();
        res.status(200).send({
            status: true,
            message: "Crawl data successfully.",
            payload: result
        });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
        })
    }
});

module.exports = router;