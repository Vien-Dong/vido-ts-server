const mongoose = require("mongoose");

const diplomaSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    studentID: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    rating: {
        type: String,
    },
    gradutateDate: {
        type: String,
        required: true
    },
    GDN: {
        type: String,
        required: true
    },
    numberInBook: {
        type: String,
        required: true
    }
})

const Diploma = mongoose.model("Diploma", diplomaSchema);
module.exports = Diploma;