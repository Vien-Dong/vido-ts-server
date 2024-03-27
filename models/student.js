const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    mssv: {
        type: String,
        required: true
    },
    sdt: {
        type: String,
        required: true
    }
})

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;