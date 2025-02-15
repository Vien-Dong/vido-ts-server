const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
    },
    isCompleted: {
        type: Boolean
    }
})

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;