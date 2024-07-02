const express = require("express");
const nodemailer = require("nodemailer");
const { sendMail } = require("../../services/mail-service");
const router = express.Router();

router.post('/send-email', (req, res) => {
    const { email, phone, message } = req.body;

    // Tạo một transporter để gửi email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'viendongtest@gmail.com', // Địa chỉ email của bạn
            pass: 'mcbm deyi kbto jchl' // Mật khẩu của email của bạn
        }
    });

    // Thiết lập nội dung email
    const mailOptions = {
        from: 'leminhquang@viendong.edu.vn', // Địa chỉ email của bạn
        to: 'apps@viendong.edu.vn', // Địa chỉ email của bạn
        subject: 'Yêu cầu xóa tài khoản',
        text: `Người dùng ứng dụng "Hướng nghiệp - VIDO Edu" muốn xóa tài khoản của họ. \nEmail xóa tài khoản: ${email}. \nSố điện thoại của người dùng: ${phone}. \nTin nhắn thêm: ${message}`
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Có lỗi xảy ra, vui lòng thử lại sau.');
        } else {
            console.log('Email đã được gửi: ' + info.response);
            res.send('Email đã được gửi đi thành công!');
        }
    });
});

router.post('/send-email-v2', (req, res) => {
    const { recipient, subject, msg } = req.body;
    const result = sendMail(recipient, subject, msg);

    console.log(result);
    res.send(200);
});

module.exports = router;