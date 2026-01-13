const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const { getAccessToken, postParticipant, putParticipant, getLatestNames } = require("../../services/crm-service");

router.post('/create-cptarget', async (req, res) => {
    try {
        const result = await postParticipant(req.body);

        if (!result) {
            return res.status(500).json({
                success: false,
                message: "Lỗi tạo mới khách hàng!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tạo khách hàng thành công.",
            payload: result
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
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

router.get("/latest-names", async (req, res) => {
    try {
        const names = await getLatestNames();
        res.json({
            success: true,
            names
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

module.exports = router;