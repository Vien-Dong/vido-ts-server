const express = require("express");
const MedicalForm = require("../../models/medical-form");
const MedicalResponse = require("../../models/medical-response");
const mongoose = require("mongoose");
const upload = require('../../middleware/upload');
const cloudinary = require('../../config/cloudinary');

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

async function uploadBase64ToCloudinary(base64String, folder = 'medical_forms') {
    try {
        const result = await cloudinary.uploader.upload(base64String, {
            folder: folder
        });

        return {
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format
        };
    } catch (err) {
        throw new Error('Failed to upload image to Cloudinary: ' + err.message);
    }
}

// Process form data with base64 images
async function processFormDataWithBase64(formData, formId) {
    const processedData = formData;

    // Lấy form cũ từ DB
    const existingForm = await MedicalForm.findById(formId);

    if (!existingForm) throw new Error("Form không tồn tại");

    if (processedData.sections) {
        for (let i = 0; i < processedData.sections.length; i++) {
            const section = processedData.sections[i];
            const existingSection = existingForm.sections?.[i];

            if (section.questions) {
                for (let j = 0; j < section.questions.length; j++) {
                    const question = section.questions[j];
                    const existingQuestion = existingSection?.questions?.[j];

                    if (question.image && question.image.startsWith('data:image/')) {
                        try {
                            const savedImage = await uploadBase64ToCloudinary(question.image);
                            question.image = savedImage.url;
                        } catch (error) {
                            console.error('Error saving base64 image:', error.message);
                            question.image = null;
                        }
                    } else if (question.image === null && existingQuestion?.image) {
                        // Nếu ảnh mới là null, nhưng câu hỏi cũ có ảnh thì giữ lại
                        question.image = existingQuestion.image;
                    }
                }
            }
        }
    }

    return processedData;
}

router.post('/admin/forms', upload.array('questionImages', 20), async (req, res) => {
    try {
        let formData;

        // Check if formData is provided (for forms with questions)
        if (req.body.formData) {
            formData = JSON.parse(req.body.formData);

            // Handle image uploads if present
            if (req.files && req.files.length > 0) {
                const uploadPromises = req.files.map(file => uploadToCloudinary(file));
                const uploadResults = await Promise.all(uploadPromises);

                let imageIndex = 0;
                for (let sectionIndex = 0; sectionIndex < formData.sections.length; sectionIndex++) {
                    const section = formData.sections[sectionIndex];

                    for (let questionIndex = 0; questionIndex < section.questions.length; questionIndex++) {
                        const question = section.questions[questionIndex];

                        if (question.hasImage && imageIndex < uploadResults.length) {
                            question.imageUrl = uploadResults[imageIndex].secure_url;
                            question.isImageQuestion = true;
                            question.question = question.question || '';
                            imageIndex++;
                        }
                    }
                }
            }
        } else {
            // Handle basic form creation (without questions)
            formData = {
                title: req.body.title,
                description: req.body.description || null,
                category: req.body.category,
                createdAt: req.body.createdAt || new Date(),
                sections: [], // Initialize with empty sections array,
                note: req.body.note || null
            };
        }

        const form = new MedicalForm(formData);
        await form.save();

        res.status(200).send({
            status: true,
            message: "Tạo form thành công",
            payload: form
        });
    } catch (error) {
        console.error('Error creating form:', error);
        res.status(400).send({
            status: false,
            message: "Tạo form thất bại",
            payload: error.message
        });
    }
});

// Updated route handler
router.put('/admin/forms/:id', async (req, res) => {
    try {
        const formId = req.params.id;

        // Process the form data and handle base64 images
        const processedData = await processFormDataWithBase64(req.body, formId);

        // Update the form in database
        const updatedForm = await MedicalForm.findByIdAndUpdate(
            formId,
            processedData,
            { new: true, runValidators: true }
        );

        if (!updatedForm) {
            return res.status(404).send({
                status: false,
                message: "Form không tồn tại",
                payload: null
            });
        }

        res.status(200).send({
            status: true,
            message: "Cập nhật form thành công",
            payload: formId
        });
    } catch (error) {
        console.error('Error updating form:', error);
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
            totalScore: req.body.totalScore,
            advice: req.body.advice
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