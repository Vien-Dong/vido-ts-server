const { default: mongoose } = require("mongoose");

const orientationResultSchema = new mongoose.Schema({
    studentCode: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    result: {
        type: Array
    }
})

const OrientationResult = mongoose.model("OrientationResult", orientationResultSchema);
module.exports = OrientationResult;