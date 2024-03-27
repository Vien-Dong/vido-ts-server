// Set environment variables for your credentials
// Read more at http://twil.io/secure
const { default: axios } = require("axios");
const Class = require("../models/class");
const Student = require("../models/student");
const moment = require("moment");
const accountSid = "AC69326f691746aaf871274ee40bc0f65b";
const authToken = "71e4b6671a8ba3c21e1d20994220384c";
const verifySid = "VA03c4f379e8e44e0c2551e9a29c87bacf";
const apiKey = "FB76CB90F33014EA7D75D9283C5409";
const secretKey = "52D3A169C65F98553D5EF95B9AD95B";
const client = require("twilio")(accountSid, authToken);

const sendOTP = async (phone) => {
    try {
        return await client.verify.v2.services(verifySid)
            .verifications.create({ to: phone, channel: "sms" });
    }
    catch (err) {
        throw err;
    }
}

const verify = async (phone, code) => {
    try {
        return await client.verify.v2.services(verifySid)
            .verificationChecks.create({ to: phone, code: code });
    }
    catch (err) {
        throw err;
    }
}

const sendSMS = async (data) => {
    try {
        let count = 0;
        if (data && typeof data === "object") {
            const classExists = await Class.findOne({
                $and: [
                    { "classID": data.subject?.lopid },
                    { "date": data.subject?.ngay }
                ]
            });
            const filteredAttendance = data.classData.filter(student => student.hiendienyn === true);
            if (classExists) {
                await send(classExists, filteredAttendance, data.type, data.sender).then((res) => {
                    count = res;
                })
                return {
                    success: true,
                    message: `Đã gửi sms đến ${count} phụ huynh.`,
                    phoneSent: count,
                    status: 200
                };
            }
            else {
                const classes = data.classData.length > 0 ? data.classData.map(function (e) {
                    return { mssv: e?.mshv, ten: e?.name, hiendien: e?.hiendienyn, smsSent: e?.hiendienyn };
                }) : [];
                const newClass = new Class({
                    classID: data.subject?.lopid,
                    students: classes,
                    date: data.subject?.ngay
                });
                await send(null, filteredAttendance, data.type, data.sender).then(async (res) => {
                    count = res || 0;
                    await newClass.save();
                }).catch((error) => console.log("Send sms: ", error));
                return {
                    success: true,
                    message: `Đã gửi sms đến ${count} phụ huynh.`,
                    phoneSent: count,
                    status: 200
                };
            }
        }
        return {
            success: false,
            message: "Không có số điện thoại nào.",
            phoneSent: 0,
            status: 200
        };
    }
    catch (err) {
        return {
            success: false,
            message: "Lỗi hệ thống.",
            phoneSent: 0,
            status: 400
        };
    }
}

const mapAttendance = async (classExists, attendanceList) => {
    for (const savedStudent of classExists.students) {
        // Tìm sinh viên tương ứng trong danh sách điểm danh
        const matchingStudent = attendanceList.find(student => student.mshv === savedStudent.mssv);

        if (matchingStudent) {
            // Cập nhật trường hiendien cho sinh viên trong danh sách đã lưu
            savedStudent.hiendien = matchingStudent.hiendienyn;
            if (matchingStudent.hiendienyn) savedStudent.smsSent = true;
        };
    }
    await Class.updateOne({ classID: classExists.classID, date: classExists.date }, { $set: { students: classExists.students } });
}

function removeVietnameseAccent(str) {
    var accentChars = "àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ";
    var noAccentChars = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydAAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYD";
    var result = "";
    for (var i = 0; i < str.length; i++) {
        var index = accentChars.indexOf(str[i]);
        if (index !== -1) {
            result += noAccentChars[index];
        } else {
            result += str[i];
        }
    }
    return result;
}

const send = async (cls, attendanceClass, type, sender) => {
    let count = 0;
    let sentList = [];
    try {
        if (cls) {
            if (cls?.students.length <= 0 && attendanceClass.length <= 0) return 0;
            const studentsToBeUpdated = [];
            attendanceClass.forEach(attendedStudent => {
                const savedStudent = cls?.students.find(saved => saved.mssv === attendedStudent.mshv);
                if (savedStudent && savedStudent.hiendien !== attendedStudent.hiendienyn) {
                    studentsToBeUpdated.push(attendedStudent);
                };
            });
            const promises = studentsToBeUpdated.map(async e => {
                const student = await Student.findOne({ "mssv": e?.mshv });
                if (student) {
                    const result = await axios.post("http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/", {
                        "ApiKey": apiKey,
                        "Content": `${removeVietnameseAccent(e?.name)} abcasd`,
                        "Phone": student.sdt,
                        "SecretKey": secretKey,
                        "SmsType": type,
                        "Brandname": sender,
                        "Sandbox": "1"
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if (result && result.data) {
                        // const status = await getStatusSMS(result.data?.SMSID);
                        // if (status && status.data) {
                        //     sentList.push({
                        //         mssv: student.mssv,
                        //         success: status.data.SendSuccess || 0,
                        //         failed: status.data.SendFailed || 0
                        //     });
                        // }
                        // else count++;
                        count++;
                    }
                }
                // else {
                //     sentList.push({
                //         mssv: e?.mshv,
                //         success: 0,
                //         failed: 0
                //     });
                // }
            });
            await Promise.all(promises);
            await mapAttendance(cls, attendanceClass);
        }
        else {
            const promises = attendanceClass.map(async e => {
                const student = await Student.findOne({ "mssv": e?.mshv });
                if (student) {
                    const result = await axios.post("http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/", {
                        "ApiKey": apiKey,
                        "Content": `${removeVietnameseAccent(e?.name)} abcasd`,
                        "Phone": student.sdt,
                        "SecretKey": secretKey,
                        "SmsType": type,
                        "Brandname": sender,
                        "Sandbox": "1"
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if (result && result.data) {
                        // const status = await getStatusSMS(result.data?.SMSID);
                        // if (status && status.data) {
                        //     sentList.push({
                        //         mssv: student.mssv,
                        //         success: status.data.SendSuccess || 0,
                        //         failed: status.data.SendFailed || 0
                        //     });
                        // }
                        // else count++;
                        count++;
                    }
                }
            });
            await Promise.all(promises);
        }
        return count;
    }
    catch (err) {
        console.log("Send: ", err);
    }
}

const sendSMS2 = async (data) => {
    try {
        return await axios.post("http://ams.tinnhanthuonghieu.vn:8009/bulkapi?wsdl", {
            "User": "smsbrand_viendong",
            "Password": "123456aA@",
            "CPCode": "CDVIENDONG_20240102_2912806",
            "RequestID": 1,
            "UserID": data.phone,
            "ReceiverID": data.phone,
            "ServiceID": data.sender,
            "CommandCode": "bulksms",
            "Content": data.message,
            "ContentType": data.contentType
        }, {
            headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
            }
        });
    }
    catch (err) {
        throw err;
    }
}


const getStatusSMS = async (SID) => {
    try {
        return await axios.get("http://rest.esms.vn/MainService.svc/json/GetSendStatus", {
            params: {
                "RefId": SID,
                "ApiKey": apiKey,
                "SecretKey": secretKey
            }
        });
    }
    catch (err) {
        throw err;
    }
}

const sendSMSTest = async (data) => {
    try {
        return await axios.post("http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/", {
            "ApiKey": apiKey,
            "Content": `Giao la ma dat lai mat khau Baotrixemay cua ban`,
            "Phone": data.sdt,
            "SecretKey": secretKey,
            "SmsType": "2",
            "Brandname": "Baotrixemay",
        });
    }
    catch (err) {
        throw err;
    }
}

const registerTemplate = async (data) => {
    try {
        return await axios.post("http://rest.esms.vn/MainService.svc/json/RegisZNSTemplateJson/", {
            "ApiKey": apiKey,
            "SecretKey": secretKey,
            "Content": data.message,
            "SmsType": data.type,
            "Brandname": data.sender,
            "ServiceType": data.serviceType,
            "IsUnicode": data.isUnicode,
            "CustomerEmail": "leminhquang@viendong.edu.vn",
            "CustomerName": "Le Minh Quang",
            "CustomerPhone": "0349337045",
        });
    }
    catch (err) {
        throw err;
    }
}

module.exports = { sendOTP, verify, sendSMS, getStatusSMS, registerTemplate, sendSMS2, sendSMSTest };