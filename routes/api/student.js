const express = require("express");
const { createStudent } = require("../../services/student-service");

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const data = req.body;
        const result = await createStudent(data.mssv, data.sdt);
        res.status(200).send({
            status: true,
            message: "Tạo thành công!",
            payload: result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

module.exports = router;