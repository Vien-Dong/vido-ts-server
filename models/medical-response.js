const mongoose = require("mongoose");

const medicalResponseSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalForm' },
    patientName: String,
    age: Number,
    gender: String,
    diagnosis: String,
    patientId: String,
    phone: String,
    guardian: String,
    salaryDate: Date,
    salaryTime: String,
    responses: [{
        questionId: String,
        answer: mongoose.Schema.Types.Mixed,
        points: Number
    }],
    totalScore: Number,
    advice: String,
    submittedAt: { type: Date, default: Date.now }
});

const MedicalResponse = mongoose.model('MedicalResponse', medicalResponseSchema);
module.exports = MedicalResponse;