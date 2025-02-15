const mongoose = require("mongoose");

const careerQuestSchema = new mongoose.Schema({
    questionId: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    options: {
        type: Array
    },
})

const CareerQuest = mongoose.model("CareerQuest", careerQuestSchema);
module.exports = CareerQuest;