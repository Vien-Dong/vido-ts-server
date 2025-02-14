const express = require("express");
const { saveDeviceId, getDeviceId, updateDeviceId } = require("../../services/check-service");
const router = express.Router();

router.post("/save-id", async (req, res) => {
    try {
        const body = req.body;
        const result = await saveDeviceId(body);
        res.status(200).send({
            status: true,
            message: "Lưu id trình duyệt thành công.",
            payload: result
        });
    }
    catch (err) {
        res.status(200).send({
            status: false,
            message: "Something went wrong!",
        });
    }
});

router.put("/update-id", async (req, res) => {
    try {
        const body = req.body;
        const result = await updateDeviceId(body);
        res.status(200).send({
            status: true,
            message: "Cập nhật id trình duyệt thành công.",
            payload: result
        });
    }
    catch (err) {
        res.status(200).send({
            status: false,
            message: "Something went wrong!",
        });
    }
});

router.get("/check-id", async (req, res) => {
    try {
        const { deviceId } = req.query;
        const result = await getDeviceId(deviceId);
        res.status(200).send({
            status: true,
            message: "Truy vấn id trình duyệt thành công.",
            payload: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

module.exports = router;