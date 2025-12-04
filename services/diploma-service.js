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
        const headers = ["Ngành","MSSV","Số hiệu", "Họ và Tên", "Ngày sinh", 
            "Giới tính", "Xếp loại", "Số QĐ Tốt nghiệp", "Năm TN","Vào sổ cấp văn bằng, chứng chỉ số"];
        const workBook = XLSX.readFile("files/DS_28-10.xlsx");
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

const updateDiploma = async (number, updateData) => {
    try {
        const diploma = await Diploma.findOne({ number });
        if (!diploma) {
            console.log(`Không tìm thấy văn bằng với số hiệu: ${number}`);
            return 0;
        }

        // Cập nhật các trường được truyền vào updateData
        Object.keys(updateData).forEach(key => {
            diploma[key] = updateData[key];
        });

        await diploma.save();
        console.log(`Đã cập nhật văn bằng số hiệu: ${number}`);
        return 1;
    } catch (err) {
        console.log("Update Diploma: ", err);
        return 0;
    }
};

const updateDiplomaFromExcel = async () => {
    try {
        let count = 0; 
        const headers = ["Ngành","MSSV","Số hiệu", "Họ và Tên", "Ngày sinh", 
            "Giới tính", "Xếp loại", "Số QĐ Tốt nghiệp", "Năm TN","Vào sổ cấp văn bằng, chứng chỉ số"];
        const workBook = XLSX.readFile("files/DS_28-10.xlsx");
        const data = XLSX.utils.sheet_to_json(workBook.Sheets["Sheet2"]);

        for (const row of data) {
            const rowData = {};
            headers.forEach(header => {
                rowData[header] = row[header];
            });

            const updateData = {
                subject: rowData[headers[0]],
                studentID: rowData[headers[1]],
                name: rowData[headers[3]],
                dateOfBirth: rowData[headers[4]],
                gender: rowData[headers[5]],
                rating: rowData[headers[6]],
                GDN: rowData[headers[7]],
                gradutateDate: rowData[headers[8]],
                numberInBook: rowData[headers[9]],
            };

            const result = await updateDiploma(rowData[headers[2]], updateData);
            count += result;
        }

        console.log(`Đã cập nhật ${count} văn bằng.`);
        return count;
    } catch (err) {
        console.log("Update Diploma From Excel: ", err);
        return 0;
    }
};


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

module.exports = { createDiploma, importDiploma,updateDiploma, getDiplomas, updateDiplomaFromExcel };