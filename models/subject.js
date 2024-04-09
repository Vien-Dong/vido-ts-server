const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    type: {
        type: String,
        required: true
    }
})

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;