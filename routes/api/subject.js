const express = require("express");
const { getSubjects, createSubject } = require("../../services/subject-service");
const { getExamsBySubject, createExam, getAllExams } = require("../../services/exam-service");

const router = express.Router();

router.get("/subjects", async (req, res) => {
    try {
        const result = await getSubjects();
        res.status(200).send({
            status: true,
            message: "Lấy danh sách môn học",
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

router.post("/create-subject", async (req, res) => {
    try {
        const data = req.body;
        const result = await createSubject(data);
        res.status(200).send({
            status: true,
            message: "Tạo thành công",
            payload: result
        })
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
        })
    }
})

router.get("/exams/:subjectID", async (req, res) => {
    try {
        const subjectID = req.params?.subjectID;
        const result = await getExamsBySubject(subjectID);
        res.status(200).send({
            status: true,
            message: "Lấy danh sách đề thi",
            payload: result
        })
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
        })
    }
})

router.get("/exams", async (req, res) => {
    try {
        const result = await getAllExams();
        res.status(200).send({
            status: true,
            message: "Lấy danh sách đề thi",
            payload: result
        })
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
        })
    }
})

router.post("/create-exam", async (req, res) => {
    try {
        const data = req.body;
        const result = await createExam(data);
        res.status(200).send({
            status: true,
            message: "Tạo đề thành công",
            payload: result
        })
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
        })
    }
})

module.exports = router;