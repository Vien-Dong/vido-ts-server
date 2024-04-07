const express = require("express");
const { createStudent, importStudent, createResult, getResult } = require("../../services/student-service");

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

router.post("/import", async (req, res) => {
    try {
        const result = await importStudent();
        res.status(200).send(`Tạo thành công ${result} học sinh`);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

router.post("/create-result", async (req, res) => {
    try {
        const data = req.body;
        const result = await createResult(data);
        res.status(result ? 200 : 400).send(result ? "Thành công." : "Thất bại.");
    }
    catch (err) {
        res.status(500).send(err);
    }
})

router.get("/result", async (req, res) => {
    try {
        const { examID, userID } = req.body;
        const result = await getResult(examID, userID);
        res.status(200).send({
            success: true,
            message: "Điểm thi.",
            payload: result
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;