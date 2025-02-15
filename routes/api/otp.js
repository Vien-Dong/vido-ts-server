const express = require("express");
const SendOtp = require('sendotp');
const { verify, sendOTP, sendSMS, getStatusSMS, getTemplate, registerTemplate, sendSMS2, sendSMSTest, generateOTP, sendOTPV2, getResultNumber, resendSMS } = require("../../services/sms-service");
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
        console.log(result);
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

router.post("/sendOTPV2", async (req, res) => {
    try {
        const { phone, content } = req.body;
        const result = await sendOTPV2(phone, content);
        res.status(200).send({
            status: true,
            message: getResultNumber(result.data) === 1 ? "Gửi mã xác thực thành công." : "Gửi thất bại, hãy thử lại sau.",
            payload: result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

router.get("/getOTP", async (req, res) => {
    try {
        const result = generateOTP();
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

router.post("/sendSMS2", async (req, res) => {
    try {
        const data = req.body;
        const result = await sendSMS2(data);
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
        const data = req.body;
        const result = await sendSMS(data);
        res.status(result.status).send(result);
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

router.post("/resendSMS", async (req, res) => {
    try {
        const data = req.body;
        const result = await resendSMS(data);
        res.status(result.status).send(result);
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

router.post("/sendSMSTest", async (req, res) => {
    try {
        const data = req.body;
        const result = await sendSMSTest(data);
        res.status(200).send(result.data);
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

router.get("/getStatus", async (req, res) => {
    try {
        const { SID } = req.body;
        await getStatusSMS(SID).then((result) => {
            res.status(200).send({
                status: true,
                message: "Kiểm tra thông tin thành công.",
                payload: result.data
            });
        }).catch((error) => {
            console.log(error);
            res.status(400).send({
                status: true,
                message: "Something went wrong!",
                payload: error
            });
        })
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

router.post("/registerTemplate", async (req, res) => {
    try {
        const data = req.body;
        await registerTemplate(data).then((result) => {
            res.status(200).send({
                status: true,
                message: "Đã gửi đơn đăng ký template.",
                payload: result.data
            });
        }).catch((error) => {
            console.log(error);
            res.status(400).send({
                status: true,
                message: "Something went wrong!",
                payload: error
            });
        })
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

module.exports = router;