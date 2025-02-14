const express = require("express");
const { getCareers, createQuestions, getQuestions, createResult, getResults, exportExcel } = require("../../services/career-service");
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

router.post("/postResult", async (req, res) => {
    try {
        const body = req.body;
        const result = await createResult(body);
        res.status(200).send({
            status: true,
            message: "Nhập kết quả thành công.",
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

router.get("/getResult", async (req, res) => {
    try {
        const result = await getResults();
        res.status(200).send({
            status: true,
            message: "Lấy danh sách kết quả thành công.",
            payload: result
        });
    }
    catch (err) {
        res.status(200).send({
            status: false,
            message: "Something went wrong!",
        });
    }
});

router.get("/exportResult", async (req, res) => {
    try {
        const result = await exportExcel();
        res.status(200).send({
            status: true,
            message: "Xuất file thành công.",
            payload: result
        });
    }
    catch (err) {
        res.status(200).send({
            status: false,
            message: "Something went wrong!",
        });
    }
});

module.exports = router;