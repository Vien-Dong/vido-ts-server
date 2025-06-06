const express = require("express");
const MedicalForm = require("../../models/medical-form");
const MedicalResponse = require("../../models/medical-response");
const mongoose = require("mongoose");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const forms = await MedicalForm.find().sort({ createdAt: -1 });
        res.status(200).send({
            status: true,
            message: "Lấy danh sách form thành công",
            payload: forms
        });
    } catch (error) {
        res.status(400).send({
            status: false,
            message: "Lấy danh sách form thất bại",
            payload: []
        });
    }
});

router.get('/admin', async (req, res) => {
    try {
        const forms = await MedicalForm.find().sort({ createdAt: -1 });
        res.status(200).send({
            status: true,
            message: "Lấy danh sách form thành công",
            payload: forms
        });
    } catch (error) {
        res.status(400).send({
            status: false,
            message: "Lấy danh sách form thất bại",
            payload: []
        });
    }
});

router.post('/admin/forms', async (req, res) => {
    try {
        const form = new MedicalForm(req.body);
        await form.save();
        res.status(200).send({
            status: true,
            message: "Tạo form thành công",
            payload: form
        });
    } catch (error) {
        res.status(400).send({
            status: false,
            message: "Tạo form thất bại",
            payload: error.message
        });
    }
});

router.put('/admin/forms/:id', async (req, res) => {
    try {
        await MedicalForm.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({
            status: true,
            message: "Cập nhật form thành công",
            payload: req.params.id
        });
    } catch (error) {
        res.status(400).send({
            status: false,
            message: "Cập nhật form thất bại",
            payload: error.message
        });
    }
});

router.delete('/admin/forms/:id', async (req, res) => {
    try {
        await MedicalForm.findByIdAndDelete(req.params.id);
        res.status(200).send({
            status: true,
            message: "Xóa form thành công",
            payload: req.params.id
        });
    } catch (error) {
        res.status(400).send({
            status: false,
            message: "Xóa form thất bại",
            payload: error.message
        });
    }
});

router.get('/forms/:id', async (req, res) => {
    try {
        const form = await MedicalForm.findById(req.params.id);
        if (!form) {
            res.status(400).send({
                status: false,
                message: "Không tìm thấy form",
                payload: null
            });
        }
        res.status(200).send({
            status: true,
            message: "Lấy form thành công",
            payload: form
        });
    } catch (error) {
        res.status(400).send({
            status: false,
            message: "Lấy form thất bại",
            payload: error.message
        });
    }
});

router.post('/forms/:id/submit', async (req, res) => {
    try {
        const form = await MedicalForm.findById(req.params.id);
        if (!form) {
            res.status(404).send({
                status: false,
                message: "Form không tồn tại",
                payload: null
            });
        }

        const patientResponse = new MedicalResponse({
            formId: req.params.id,
            patientName: req.body.patientName,
            age: req.body.age,
            gender: req.body.gender,
            diagnosis: req.body.diagnosis,
            patientId: req.body.patientId,
            phone: req.body.phone,
            guardian: req.body.guardian,
            salaryDate: req.body.salaryDate,
            salaryTime: req.body.salaryTime,
            responses: req.body.responses,
            totalScore: req.body.totalScore
        });

        await patientResponse.save();
        res.status(200).send({
            status: true,
            message: "Lưu kết quả thành công",
            payload: req.body.totalScore
        });
    } catch (error) {
        res.status(400).send({
            status: false,
            message: "Lưu kết quả thất bại",
            payload: error.message
        });
    }
});

router.get('/responses', async (req, res) => {
    try {
        const { id, phone } = req.query;
        const query = {};

        if (id) {
            const isObjectId = mongoose.Types.ObjectId.isValid(id);
            query.$or = [];

            if (isObjectId) {
                query.$or.push({ formId: new mongoose.Types.ObjectId(id) });
            }

            query.$or.push({ patientId: id });
        }

        if (phone) {
            query.phone = phone;
        }

        const responses = await MedicalResponse.find(query).sort({ submittedAt: -1 });
        res.status(200).send({
            status: true,
            message: "Lấy kết quả thành công",
            payload: responses
        });
    } catch (error) {
        res.status(200).send({
            status: false,
            message: "Lấy kết quả thất bại",
            payload: error.message
        });
    }
});

module.exports = router;