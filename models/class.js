const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    classID: {
        type: String,
        required: true
    },
    students: {
        type: Array,
    },
    date: {
        type: Date
    }
})

const Class = mongoose.model("Class", classSchema);
module.exports = Class;