const mongoose = require("mongoose");

const resultExamSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    examID: {
        type: String,
        require: true
    },
    score: {
        type: Number,
        require: true
    },
    correctCount: {
        type: Number,
        require: true
    },
    timeFinish: {
        type: String,
        require: true
    },
    totalTime: {
        type: Number,
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    createdDate: {
        type: Date,
        default: new Date()
    }
})

const ResultExam = mongoose.model("ResultExam", resultExamSchema);
module.exports = ResultExam;