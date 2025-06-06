const mongoose = require("mongoose");

const medicalFormSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: String,
    sections: [{
        title: String,
        questions: [{
            type: { type: String, enum: ['checkbox', 'radio', 'text', 'number', 'date', 'dropdown'] },
            question: String,
            options: [{
                label: String,
                value: String,
                points: Number
            }]
        }]
    }],
    createdAt: { type: Date, default: Date.now }
});

const MedicalForm = mongoose.model("MedicalForm", medicalFormSchema);
module.exports = MedicalForm;