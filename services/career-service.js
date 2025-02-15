const { collection, getDocs } = require("firebase/firestore");
const { database } = require("../config/firebase");
const CareerQuest = require("../models/career");
const OrientationResult = require("../models/orientation_result");
const excel = require('excel4node');
const moment = require('moment');

const getCareers = async () => {
    try {
        const careerCol = collection(database, "careers");
        const data = await getDocs(careerCol);
        const careers = data.docs.map(doc => doc.data());
        return careers;
    }
    catch (err) {
        console.log(err);
    }
}

const getQuestions = async () => {
    try {
        return await CareerQuest.find();
    }
    catch (err) {
        return err;
    }
}

const createQuestions = async (data) => {
    try {
        const careerQuest = new CareerQuest(data);
        return await careerQuest.save();
    }
    catch (err) {
        return err;
    }
}

const createResult = async (data) => {
    try {
        const orientationResult = new OrientationResult(data);
        return await orientationResult.save();
    }
    catch (err) {
        throw Error("Lỗi khi tạo kết quả");
    }
}

const getResults = async () => {
    try {
        return await OrientationResult.find();
    }
    catch (err) {
        return err;
    }
}

const exportExcel = async () => {
    try {
        const data = await getResults();
        var workbook = new excel.Workbook();

        // Add Worksheets to the workbook
        var worksheet = workbook.addWorksheet('Kết quả');

        worksheet.cell(1, 1).string('MSSV');
        worksheet.cell(1, 2).string('Họ tên');
        worksheet.cell(1, 3).string('Ngày sinh');

        const columns = [
            {
                label: "Cơ khí",
                type: "mechanic"
            },
            {
                label: "Kế toán",
                type: "accountant"
            },
            {
                label: "Nhà hàng - khách sạn",
                type: "restaurant"
            },
            {
                label: "Logistics",
                type: "logistics"
            },
            {
                label: "Ô tô",
                type: "car"
            },
            {
                label: "Chăm sóc sắc đẹp",
                type: "beauticare"
            },
            {
                label: "Điện - điện tử",
                type: "electronic"
            },
            {
                label: "Quản trị kinh doanh",
                type: "business"
            },
            {
                label: "Điều dưỡng",
                type: "nursing"
            },
            {
                label: "Chế biến món ăn",
                type: "kitchen"
            },
            {
                label: "Mạng máy tính",
                type: "network"
            },
            {
                label: "Lập trình ứng dụng",
                type: "programing"
            },
        ];

        data.forEach((item, index) => {
            worksheet.cell(index + 2, 1).number(item.studentCode);
            worksheet.cell(index + 2, 2).string(item.name);
            worksheet.cell(index + 2, 3).string(item.birthday);
        });

        columns.forEach((e, index) => {
            const column = index + 4; // Bắt đầu từ cột thứ 4 (sau 3 cột cố định)
            worksheet.cell(1, column).string(e.label); // Đặt header cho từng cột loại

            // Đổ dữ liệu cho từng loại
            data.forEach((item, rowIndex) => {
                const result = item.result.find(r => r.type === e.type);
                if (result) {
                    worksheet.cell(rowIndex + 2, column).number(result.score);
                } else {
                    worksheet.cell(rowIndex + 2, column).number(0); // Nếu không có dữ liệu, gán 0
                }
            });
        });

        const industriesColumn = columns.length + 4; // Vị trí của cột "Ngành phù hợp"
        worksheet.cell(1, industriesColumn).string('Ngành nghề phù hợp');

        data.forEach((item, rowIndex) => {
            let maxScore = -1;
            let bestIndustry = '';

            // Tìm loại công việc có điểm số cao nhất
            item.result.forEach(result => {
                if (result.score > maxScore) {
                    maxScore = result.score;
                    bestIndustry = columns.find(x => x.type === result.type)?.label;
                } else if (result.score === maxScore) {
                    if (Math.random() < 0.5) {
                        bestIndustry = columns.find(x => x.type === result.type)?.label;
                    }
                }
            });

            worksheet.cell(rowIndex + 2, industriesColumn).string(bestIndustry);
        });

        workbook.write(`Data.xlsx`);
    }
    catch (err) {
        console.log(err);
        throw Error("Lỗi hệ thống");
    }
}

module.exports = { getCareers, createQuestions, getQuestions, createResult, getResults, exportExcel }; 