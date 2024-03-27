const Student = require("../models/student");

const createStudent = async (mssv, sdt) => {
    try {
        const student = await Student.findOne({ "mssv": mssv });
        if(!student)
        {
            const newStudent = new Student({mssv, sdt});
            await newStudent.save();
            return 1;
        };
        return 0;
    } catch (err) {
        console.log("Create student: ", err);
        return 0;
    }
}

module.exports = { createStudent };