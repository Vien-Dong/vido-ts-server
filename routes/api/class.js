const express = require("express");
const { getClasses } = require("../../services/class-service");
const router = express.Router();

router.get("/get", async (req, res) => {
    try {
        const result = await getClasses();
        res.status(200).send({
            status: true,
            message: "Lấy danh sách lớp thành công.",
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