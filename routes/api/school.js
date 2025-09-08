// proxy-server.js
const express = require("express");
const axios = require("axios");
const Survey = require("../../models/survey");
const router = express.Router();

const baseUrl = "http://ims-api.viendong.edu.vn/api/v1";

router.post("/login", async (req, res) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, req.body);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/tkb", async (req, res) => {
    try {
        const { ngay } = req.query;
        const token = req.headers.token;

        const response = await axios.get(`${baseUrl}/giangvien/tkbtheongay?ngay=${ngay}`, {
            headers: {
                token: token
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/studentList", async (req, res) => {
    try {
        const token = req.headers.token;

        const response = await axios.post(`${baseUrl}/giangvien/diemdanh/danhsach`, req.body, {
            headers: {
                token: token
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/save", async (req, res) => {
    try {
        const token = req.headers.token;

        const response = await axios.post(`${baseUrl}/giangvien/diemdanh/luu`, req.body, {
            headers: {
                token: token
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/devices", async (req, res) => {
    try {
        const token = req.headers.token;

        const response = await axios.get(`${baseUrl}/manager/student?department_code=0&require_device_token=true`, {
            headers: {
                token: token
            }
        });
        
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/create-survey", async (req, res) => {
    const data = req.body;

    try {
        const survey = new Survey({
            url: data.url,
            dateToDo: data.dateToDo,
            createdAt: data.createdAt ?? new Date()
        });

        await survey.save();

        res.json({
            status: true,
            message: "Tạo khảo sát thành công",
            payload: []
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
