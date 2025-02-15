const ResultExam = require("../models/result");
const Student = require("../models/student");
const XLSX = require("xlsx");

const createStudent = async (mssv, sdt_cha_me, sdt_hoc_sinh) => {
    try {
        const student = await Student.findOne({ "mssv": mssv });
        if (!student) {
            const newStudent = new Student({ mssv, sdt_cha_me, sdt_hoc_sinh });
            await newStudent.save();
            return 1;
        };
        return 0;
    } catch (err) {
        console.log("Create student: ", err);
        return 0;
    }
}

const getStudents = async () => {
    try {
        return await Student.find();
    } catch (err) {
        console.log("Get students: ", err);
        return 0;
    }
}

const importStudent = async () => {
    try {
        let count = 0;
        const headers = ["MSSV", "PARENT'S PHONE", "STUDENT'S PHONE"];
        const workBook = XLSX.readFile("files/ds.xlsx");
        const sheetName = workBook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);

        const processRows = async () => {
            for (const row of data) {
                const rowData = {};
                headers.forEach(header => {
                    rowData[header] = row[header];
                });
                const result = await createStudent(rowData[headers[0]], rowData[headers[1]], rowData[headers[2]]);
                count += result;
            }
        };
        await processRows();
        return count;
    } catch (err) {
        console.log("Import student: ", err);
        return 0;
    }
}

const createResult = async (data) => {
    try {
        const newResult = new ResultExam(data);
        await newResult.save();
        return true;
    } catch (err) {
        console.log("Create result: ", err);
        return false;
    }
}

const getResult = async (examID, userID) => {
    try {
        const result = await ResultExam.findOne({ examID, userID });
        return result;
    }
    catch (err) {
        return null;
    }
}

module.exports = { createStudent, importStudent, createResult, getResult, getStudents };