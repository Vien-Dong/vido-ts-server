const express = require("express");
const { createDiploma, importDiploma, getDiplomas } = require("../../services/diploma-service");

const router = express.Router();

router.get("/get", async (req, res) => {
    try {
        const { number } = req.query;

        const result = await getDiplomas(number);
        res.status(200).send({
            status: true,
            message: "Lấy danh sách văn bằng thành công",
            payload: result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

router.post("/create", async (req, res) => {
    try {
        const data = req.body;
        const result = await createDiploma(data.subject, data.studentID, data.number, data.name, 
            data.dateOfBirth, data.gender, data.rating, data.GDN, data.gradutateDate, data.numberInBook);
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
        const result = await importDiploma();
        res.status(200).send(`Tạo thành công ${result} văn bằng`);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;
