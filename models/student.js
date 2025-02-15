const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    mssv: {
        type: String,
        required: true
    },
    sdt_cha_me: {
        type: String,
    },
    sdt_hoc_sinh: {
        type: String,
    }
})

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;