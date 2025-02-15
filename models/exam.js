const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    subjectID: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    timeToDo: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    exam: {
        type: Array,
    },
    answer: {
        type: String
    }
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;