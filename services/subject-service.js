const Subject = require("../models/subject");


const getSubjects = async () => {
    try {
        return await Subject.find();
    } catch (err) {
        return {
            success: false,
            message: "Lỗi hệ thống.",
            status: 400
        };
    }
}

const createSubject = async (subject) => {
    try {
        const subjects = await getSubjects();
        if(subjects) subject["id"] = subjects.length;
        const newSubject = new Subject(subject);
        return await newSubject.save();
    }
    catch (err) {
        return {
            success: false,
            message: "Lỗi hệ thống.",
            status: 400
        };
    }
}

module.exports = { getSubjects, createSubject };