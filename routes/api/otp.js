const express = require("express");
const SendOtp = require('sendotp');
const router = express.Router();
const sendOtp = new SendOtp("416729AR68krNrLeW65d6cda3P1");

router.post("/sendOTP", async (req, res) => {
    try {
        sendOtp.send("+84349337045", "VIDO", "123456", function (error, data) {
            console.log(data);
        });
        res.status(200).send("success");
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

module.exports = router;