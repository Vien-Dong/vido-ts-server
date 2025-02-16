const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const { getAccessToken, postParticipant, putParticipant } = require("../../services/crm-service");

router.post('/create-cptarget', async (req, res) => {
    const data = req.body;

    try {
        const result = await postParticipant(data);
        if (!result) res.status(500).send("Lỗi tạo mới khách hàng!");
        res.status(200).send({
            success: true,
            message: "Tạo khách hàng thành công.",
            payload: result
        });
    }
    catch (error) {
        console.log(error);
    }
});

router.put('/update-cptarget', async (req, res) => {
    const record_id = req.query.record_id;
    const data = req.body;

    try {
        const result = await putParticipant(data, record_id);
        res.status(200).send({
            success: true,
            message: "Tạo khách hàng thành công.",
            payload: result
        });
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/get-token', async (req, res) => {
    try {
        const result = await getAccessToken();
        res.status(200).send({
            success: true,
            message: "Lấy token thành công.",
            payload: result
        });
    }
    catch (error) {
        console.log(error);
    }
});

module.exports = router;