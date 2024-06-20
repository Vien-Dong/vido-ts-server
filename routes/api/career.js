const express = require("express");
const { getCareers, createQuestions, getQuestions } = require("../../services/career-service");
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
});

router.get("/getQuestion", async (req, res) => {
    try {
        const result = await getQuestions();
        console.log(result);
        res.status(200).send({
            status: true,
            message: "Lấy danh sách câu hỏi thành công.",
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
});

router.post("/postQuestion", async (req, res) => {
    try {
        const body = req.body;
        const result = await createQuestions(body);
        console.log(result);
        res.status(200).send({
            status: true,
            message: "Tạo câu hỏi nghề thành công.",
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
});

module.exports = router;