const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    dateToDo: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

const Survey = mongoose.model("Survey", surveySchema);
module.exports = Survey;