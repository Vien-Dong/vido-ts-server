var express = require("express");
var cors = require('cors');
var mongoose = require('mongoose');
var io = require("socket.io-client")("https://vido-ts-server.onrender.com");
const Message = require("./models/message");

require('dotenv').config();

var app = express();

var port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb+srv://administrator:admin123456@cluster.jh4lmtx.mongodb.net/").then(() => {
    console.log("Connected to mongodb");
}).catch((err) => {
    console.log("Error connecting to mongodb: ", err);
})

let chatgroups = [];

io.on("connection", (socket) => {
    console.log(`${socket.id} user is just connected`);

    // socket.on("getAllGroups", () => {
    //     socket.emit("groupList", chatgroups);
    // });

    // socket.on("createNewGroup", (currentGroupName) => {
    //     console.log(currentGroupName);
    //     chatgroups.unshift({
    //         id: chatgroups.length + 1,
    //         currentGroupName,
    //         messages: [],
    //     });
    //     socket.emit("groupList", chatgroups);
    // });

    socket.on("findGroup", async (id) => {
        const filteredGroup = await Message.find({ "roomId": id });
        chatgroups = filteredGroup;
        socket.emit("foundGroup", filteredGroup);
    });

    socket.on("newChatMessage", (data) => {
        const { roomId, sender, messageType, messageText } = data;
        const obj = {
            roomId,
            sender,
            messageType,
            message: messageText,
            timeStamp: new Date(),
        }

        const messageMongo = new Message(obj);
        messageMongo.save();

        socket.emit("groupMessage", obj);
        chatgroups.push(obj);
        // socket.emit("groupList", chatgroups);
        socket.emit("foundGroup", chatgroups);
    });
})

app.use('/api/notification', require('./routes/api/notification'));
app.use('/api/chat', require('./routes/api/chat'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});