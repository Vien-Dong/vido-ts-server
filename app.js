var express = require("express");
var cors = require('cors');
var mongoose = require('mongoose');
const Message = require("./models/message");

require('dotenv').config();

var app = express();
var http = require('http');
const path = require("path");

var socketIO = require("socket.io");

var port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('js'));

mongoose.connect("mongodb+srv://administrator:admin123456@cluster.jh4lmtx.mongodb.net/").then(() => {
    console.log("Connected to mongodb");
}).catch((err) => {
    console.log("Error connecting to mongodb: ", err);
})

app.use('/api/notification', require('./routes/api/notification'));
app.use('/api/chat', require('./routes/api/chat'));
app.use('/api/mobile', require('./routes/api/otp'));
app.use('/api/mail', require("./routes/api/mail"));
app.use('/api/crm', require("./routes/api/crm"));
app.use('/api/google', require("./routes/api/google"));
app.use('/api/student', require("./routes/api/student"));
app.use('/api/career', require("./routes/api/career"));
app.get('/delete-account', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});
app.get('/lucky-wheel', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/lucky/lucky_wheel.html'));
});
app.use(express.static(__dirname + '/pages/lucky'));
app.use(express.static(path.join(__dirname, 'pages')));

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3050",
        credentials: true,
    },
});

io.on("connection", (socket) => {
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

    socket.on("connect_error", (err) => {
        // the reason of the error, for example "xhr poll error"
        console.log(err.message);

        // some additional description, for example the status code of the initial HTTP response
        console.log(err.description);

        // some additional context, for example the XMLHttpRequest object
        console.log(err.context);
    });
})