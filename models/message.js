const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
    },
    sender: {
        type: Object,
        required: true
    },
    // recepientId: {
    //     type: Object,
    //     required: true
    // },
    messageType: {
        type: String,
        enum: ["text", "image"]
    },
    message: String,
    imageUrl: String,
    timeStamp: {
        type: Date,
        default: Date.now()
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;