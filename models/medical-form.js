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
            image: String,
            options: [{
                label: String,
                value: String,
                points: Number
            }]
        }]
    }],
    // criteria: [{
    //     min: Number,
    //     max: Number,
    //     message: String
    // }],
    standardPoint: {
        value: { type: Number, required: true },
        lessMessage: String,
        greaterMessage: String
    },
    createdAt: { type: Date, default: Date.now },
    note: String
});

const MedicalForm = mongoose.model("MedicalForm", medicalFormSchema);
module.exports = MedicalForm;