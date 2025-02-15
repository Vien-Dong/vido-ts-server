const Exam = require("../models/exam")

const getExamsBySubject = async (subjectID) => {
    try {
        return await Exam.find({ "subjectID": subjectID });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
        })
    }
}

const getAllExams = async () => {
    try {
        return await Exam.find();
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
        })
    }
}

const createExam = async (exam) => {
    try {
        const newExam = new Exam(exam);
        return await newExam.save();
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
        })
    }
}

module.exports = { getExamsBySubject, createExam, getAllExams };