
const express = require("express");
const Message = require("../../models/message");

const router = express.Router();

router.post("/send", async (req, res) => {
    try {
        const { roomId, sender, messageType, messageText } = req.body;

        const newMessage = new Message({
            roomId,
            sender,
            messageType,
            message: messageText,
            timestamp: new Date(),
            imageUrl: messageType === "image" ? req.file.path : null,
        });

        await newMessage.save();
        res.status(200).send({ message: "Message sent Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.get("/messages/:roomId", async (req, res) => {
    try {
        const {roomId} = req.params;
        const messages = await Message.find({ "roomId": roomId });

        res.status(200).send(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/delete", async (req, res) => {
    try {
        const { messages } = req.body;

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).send({ message: "invalid req body!" });
        }

        await Message.deleteMany({ _id: { $in: messages } });

        res.status(200).send({ message: "Message deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server" });
    }
});

module.exports = router;