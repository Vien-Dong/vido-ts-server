const mongoose = require("mongoose");

const medicalBlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    categoryId: { type: String, required: true },
    content: { type: String, required: true, minLength: 100 },
    excerpt: { type: String },
    tags: { type: [String] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

const MedicalBlog = mongoose.model("MedicalBlog", medicalBlogSchema);
module.exports = MedicalBlog;