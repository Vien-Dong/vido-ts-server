const express = require("express");
const { getZaloNumber, getAccessToken, getTokenFromDB, revokeToken, getAccessTokenWhenRefreshtokenExpire, sendMessage } = require("../../services/zalo");

const router = express.Router();

router.get("/get-phone", async (req, res) => {
    try {
        const { token } = req.body;
        const result = await getZaloNumber(token);
        res.status(200).send({
            status: true,
            message: "Lấy số thành công!",
            payload: result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
});

router.post("/get-access-token", async (req, res) => {
    try {
        const result = await getAccessToken();
        res.status(200).send({
            status: true,
            message: "Thành công!",
            payload: result === "error" ? "Lỗi token" : result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
});

router.post("/get-access-token-when-refresh-token-expired", async (req, res) => {
    try {
        const { token } = req.body;
        const result = await getAccessTokenWhenRefreshtokenExpire(token);
        res.status(200).send({
            status: true,
            message: "Thành công!",
            payload: result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
});

router.get("/get-access-token", async (req, res) => {
    try {
        const result = await getTokenFromDB();
        res.status(200).send({
            status: true,
            message: "Thành công!",
            payload: result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
});

router.post("/revoke-token", async (req, res) => {
    try {
        const { token } = req.body;
        const result = await revokeToken(token, false);
        res.status(200).send({
            status: true,
            message: "Thành công!",
            payload: result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
});

router.post("/send-message", async (req, res) => {
    try {
        const { phone, templateId, templateData, trackingId } = req.body;
        const result = await sendMessage(phone, templateId, templateData, trackingId);
        res.status(200).send({
            status: true,
            message: "Thành công!",
            payload: result
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
});

module.exports = router;