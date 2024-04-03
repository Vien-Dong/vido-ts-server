const express = require("express");
const { getCareers } = require("../../services/career-service");
const router = express.Router();

router.get("/get", async (req, res) => {
    try {
        const result = await getCareers();
        res.status(200).send({
            status: true,
            message: "Lấy danh sách ngành nghề thành công.",
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