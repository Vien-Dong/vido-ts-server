const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'viendongtest@gmail.com', // Địa chỉ email của bạn
        pass: 'mcbm deyi kbto jchl' // Mật khẩu của email của bạn
    }
});

const sendMail = (recipient, subject, msg) => {
    // Email data
    const mailOptions = {
        from: '"Cao đẳng Viễn Đông 👻" <viendongtest@gmail.com>',
        to: recipient,
        subject: subject,
        text: msg,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = { sendMail };