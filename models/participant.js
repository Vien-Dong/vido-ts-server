const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    phone: {
        type: String,
    },
})

const Participant = mongoose.model("Participant", participantSchema);
module.exports = Participant;