const express = require("express");
const { getBookInfo, crawlData } = require("../../services/book-service");
const router = express.Router();

router.get("/getBookInfo", async (req, res) => {
    try {
        const { isbn } = req.query;
        const result = await getBookInfo(isbn);
        res.status(200).send({
            status: true,
            message: "Lấy danh sách sách thành công.",
            payload: result
        });
    }
    catch (err) {
        res.status(200).send({
            status: false,
            message: "Something went wrong!",
        });
        console.log(err);
    }
})

router.get("/craw", async (req, res) => {
    try {
        const { isbn } = req.query;
        const result = await crawlData(isbn);
        res.status(200).send({
            status: true,
            message: "Lấy danh sách sách thành công.",
            payload: result
        });
    }
    catch (err) {
        res.status(200).send({
            status: false,
            message: "Something went wrong!",
        });
        console.log(err);
    }
})


module.exports = router;