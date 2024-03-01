const express = require("express");
const SendOtp = require('sendotp');
const { verify, sendOTP, sendSMS } = require("../../services/sms-service");
const router = express.Router();
const sendOtp = new SendOtp("416729AR68krNrLeW65d6cda3P1");


// router.post("/sendOTP", async (req, res) => {
//     try {
//         sendOtp.send("+84349337045", "VIDO", "123456", function (error, data) {
//             console.log(data);
//         });
//         res.status(200).send("success");
//     }
//     catch (err) {
//         res.status(400).send('Something went wrong!');
//         console.log(err);
//     }
// })

router.post("/sendOTP", async (req, res) => {
    try {
        const { phone } = req.body;
        const result = await sendOTP(phone);
        res.status(200).send({
            status: true,
            message: "Gửi mã xác thực thành công.",
            payload: result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

router.post("/verifyOTP", async (req, res) => {
    try {
        const { phone, code } = req.body;
        const result = await verify(phone, code);
        res.status(200).send({
            status: true,
            message: "Xác thực thành công.",
            payload: result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

router.post("/sendSMS", async (req, res) => {
    try {
        const { phone, message } = req.body;
        const result = await sendSMS(phone, message);
        res.status(200).send({
            status: true,
            message: "Gửi tin nhắn thành công.",
            payload: result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

module.exports = router;