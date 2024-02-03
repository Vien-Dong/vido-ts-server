var express = require("express");
var cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');

require('dotenv').config();

var app = express();

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listenning in port ", port);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

mongoose.connect("mongodb+srv://administrator:admin123456@cluster.jh4lmtx.mongodb.net/").then(() => {
    console.log("Connected to mongodb");
}).catch((err) => {
    console.log("Error connecting to mongodb: ", err);
})

app.use('/api/notification', require('./routes/api/notification'));
app.use('/api/chat', require('./routes/api/chat'));