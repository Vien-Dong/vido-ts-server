// proxy-server.js
const express = require("express");
const axios = require("axios");
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

module.exports = router;
