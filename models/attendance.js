const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    mshv: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        required: true
    },
    tkbId: {
        type: String,
        required: true
    },
    ngay: {
        type: String,
        required: true
    }
})

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;