const Diploma = require("../models/diploma");
const XLSX = require("xlsx");

const createDiploma = async (subject, studentID, number, name, dateOfBirth, gender, rating, GDN, numberInBook) => {
    try {
        const diploma = await Diploma.findOne({ "numberInBook": numberInBook });
        if (!diploma) {
            const newDiploma = new Diploma({ subject, studentID,number, name, dateOfBirth, gender, rating, GDN, numberInBook});
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
        const headers = ["SUBJECT", "STUDENTID", "NUMBER", "NAME", "DATEOFBIRTH", 
            "GENDER", "RATING", "GDN", "NUMBERINBOOK"];
        const workBook = XLSX.readFile("files/DS_van_bang.xlsx");
        const data = XLSX.utils.sheet_to_json(workBook.Sheets["DS_VAN_BANG"]);

        const processRows = async () => {
            for (const row of data) {
                const rowData = {};
                console.log(row);
                headers.forEach(header => {
                    rowData[header] = row[header];
                });
                const result = await createDiploma(rowData[headers[0]], rowData[headers[1]], rowData[headers[2]], rowData[headers[3]], 
                    rowData[headers[4]], rowData[headers[5]], rowData[headers[6]], rowData[headers[7]], rowData[headers[8]]);
                count += result;
            }
        };
        await processRows();
        return count;
    } catch (err) {
        console.log("Import Diploma: ", err);
        return 0;
    }
}

const getDiplomas = async (numberInBook) => {
    try {
        const result = await Diploma.findOne({ numberInBook });
        return result;
    }
    catch (err) {
        return null;
    }
}

module.exports = { createDiploma, importDiploma, getDiplomas };