const mongoose = require("mongoose");

const medicalCategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String },
    iconUrl: { type: String },
    description: { type: String },
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const MedicalCategory = mongoose.model("MedicalCategory", medicalCategorySchema);
module.exports = MedicalCategory;