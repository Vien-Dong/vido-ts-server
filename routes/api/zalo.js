const express = require("express");
const { getZaloNumber } = require("../../services/zalo");

const router = express.Router();

router.get("/get-phone", async (req, res) => {
    try {
        const { token } = req.body;
        const result = await getZaloNumber(token);
        res.status(200).send({
            status: true,
            message: "Lấy số thành công!",
            payload: result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
});

module.exports = router;