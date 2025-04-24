const Diploma = require("../models/diploma");
const XLSX = require("xlsx");

const createDiploma = async (subject, studentID, number, name, dateOfBirth, gender, rating, GDN, gradutateDate ,numberInBook) => {
    try {
        const diploma = await Diploma.findOne({ "numberInBook": numberInBook });
        if (!diploma) {
            const newDiploma = new Diploma({ subject, studentID,number, name, dateOfBirth, gender, rating, GDN, gradutateDate,  numberInBook});
            await newDiploma.save();
            return 1;
        };
        return 0;
    } catch (err) {
        console.log("Create Diploma: ", err);
        return 0;
    }
}

const importDiploma = async () => {
    try {
        let count = 0; 
        const headers = ["Ngành","MSSV","Số hiệu ", "Họ và Tên", "Ngày sinh", 
            "Giới tính", "Xếp loại", "Số QĐ Tốt nghiệp", "Năm TN","Vào sổ cấp văn bằng, chứng chỉ số"];
        const workBook = XLSX.readFile("files/Upwweb_ĐC.xlsx");
        const data = XLSX.utils.sheet_to_json(workBook.Sheets["Sheet1"]);

        const processRows = async () => {
            for (const row of data) {
                const rowData = {};
                //console.log(row);
                headers.forEach(header => {
                    rowData[header] = row[header];
                });
                const result = await createDiploma(rowData[headers[0]], rowData[headers[1]], rowData[headers[2]], rowData[headers[3]], 
                    rowData[headers[4]], rowData[headers[5]], rowData[headers[6]], rowData[headers[7]], rowData[headers[8]], rowData[headers[9]]);
                count += result;
                console.log("row data:", rowData[headers[4]]);
            }
        };
        await processRows();
        return count;
    } catch (err) {
        console.log("Import Diploma: ", err);
        return 0;
    }
}

const getDiplomas = async (number) => {
    try {
        const res = number.replace(/_/g, ' ');
        const result = await Diploma.findOne({ number: res });
        return result;
    }
    catch (err) {
        return null;
    }
}

module.exports = { createDiploma, importDiploma, getDiplomas };