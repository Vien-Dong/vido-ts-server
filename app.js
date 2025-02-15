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

const allowedOrigins = [
    'http://localhost:3050',  // Cho phép localhost
    'https://vido-ts-server-v1.vercel.app/' // Domain trên Vercel
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));
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
app.use('/api/class', require("./routes/api/class"));
app.use('/api/career', require("./routes/api/career"));
app.use('/api/zalo', require("./routes/api/zalo"));
app.use('/api/subject', require("./routes/api/subject"));
app.use('/api/website', require("./routes/api/website"));
app.use('/api/book', require("./routes/api/book"));
app.use('/api/diploma', require("./routes/api/diploma"));
app.use('/api/check', require("./routes/api/check"));

app.get('/delete-account', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});
app.get('/lucky-wheel', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/lucky/lucky_wheel.html'));
});
app.get('/exam', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/exam/exam.html'));
});
app.get('/template', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/contact/contact.html'));
});
app.get('/orientation', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/career/career.html'));
});
app.get('/orientation', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/management/index.html'));
});
app.get('/library', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/library/library.html'));
});
app.get('/library/detail', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/library/detail.html'));
});
app.use(express.static(__dirname + '/pages'));
app.use(express.static(__dirname + '/pages/lucky'));
app.use(express.static(__dirname + '/pages/exam'));
app.use(express.static(__dirname + '/pages/contact'));
app.use(express.static(__dirname + '/pages/career'));
app.use(express.static(__dirname + '/pages/management'));
app.use(express.static(__dirname + '/pages/library'));
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