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
const accessToken = "ietDWAbPCVg22JvkVQFZUFutqUlCgcUU";
const client = require("twilio")(accountSid, authToken);
const otpGenerator = require('otp-generator')

const sendOTP = async (phone) => {
    try {
        var auth = Buffer.from(accessToken + ':x').toString('base64');
        var otpCode = generateOTP();
        const params = {
            "access-token": accessToken,
            "sender": "6df626e2f56d11f2",
            "type": 5,
            "to": phone,
            "content": `Ma xac thuc ung dung Huong nghiep VIDO Edu cua ban la: ${otpCode}`,
        };
        const result = await axios.post("https://api.speedsms.vn/index.php/sms/send", null, {
            headers: {
                "Authorization": `Basic ${auth}`,
                "Content-Type": "application/json"
            },
            params
        });
        return { data: result.data, code: otpCode };
    }
    catch (err) {
        throw err;
    }
}

const sendOTPV2 = async (phone) => {
    try {
        var otpCode = generateOTP();
        var xmlStr = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.bulkSms.ws/">
                <soapenv:Header/>
                <soapenv:Body>
                    <impl:wsCpMt>
                        <!--Optional:-->
                        <User>smsbrand_viendong</User>
                        <!--Optional:-->
                        <Password>Viendong#12</Password>
                        <!--Optional:-->
                        <CPCode>CDVIENDONG</CPCode>
                        <!--Optional:-->
                        <RequestID>1</RequestID>
                        <!--Optional:-->
                        <UserID>${phone}</UserID>
                        <!--Optional:-->
                        <ReceiverID>${phone}</ReceiverID>
                        <!--Optional:-->
                        <ServiceID>CDVienDong</ServiceID>
                        <!--Optional:-->
                        <CommandCode>bulksms</CommandCode>
                        <!--Optional:-->
                        <Content>${`Ma xac thuc ung dung Huong nghiep VIDO Edu cua ban la: ${otpCode}`}</Content>
                        <!--Optional:-->
                        <ContentType>0</ContentType>
                    </impl:wsCpMt>
                </soapenv:Body>
            </soapenv:Envelope>
        `
        const result = await axios.post(
            'https://ams.tinnhanthuonghieu.vn:8998/bulkapi?wsdl',
            xmlStr,
            {
                headers: {
                    "Content-Type": "text/xml"
                }
            }
        );
        return { data: result.data, code: otpCode };
    } catch (err) {
        throw err;
    }
}

const getResultNumber = (xmlString) => {
    let startIndex = xmlString.indexOf('<result>') + '<result>'.length;
    let endIndex = xmlString.indexOf('</result>', startIndex);
    let resultValue = xmlString.substring(startIndex, endIndex);
    return Number(resultValue) || 0;
}

const generateOTP = () => {
    const digits = 6;
    const otp = otpGenerator.generate(digits, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    return otp;
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
                await send(classExists, filteredAttendance).then((res) => {
                    count = res || 0;
                }).catch((error) => console.log("Send sms: ", error));
                return {
                    success: true,
                    message: `Đã gửi sms đến ${count} phụ huynh.`,
                    phoneSent: count,
                    status: 200
                };
            }
            else {
                const classes = data.classData.length > 0 ? data.classData.map(function (e) {
                    return { mssv: e?.mshv, ten: e?.name, hiendien: false, smsSent: false };
                }) : [];
                const newClass = new Class({
                    classID: data.subject?.lopid,
                    students: classes,
                    date: data.subject?.ngay
                });
                await send(newClass, filteredAttendance).then(async (res) => {
                    count = res || 0;
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

const sendMessage = async (phone, message) => {
    var xmlStr = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.bulkSms.ws/">
                <soapenv:Header/>
                <soapenv:Body>
                    <impl:wsCpMt>
                        <!--Optional:-->
                        <User>smsbrand_viendong</User>
                        <!--Optional:-->
                        <Password>Viendong#12</Password>
                        <!--Optional:-->
                        <CPCode>CDVIENDONG</CPCode>
                        <!--Optional:-->
                        <RequestID>1</RequestID>
                        <!--Optional:-->
                        <UserID>${phone}</UserID>
                        <!--Optional:-->
                        <ReceiverID>${phone}</ReceiverID>
                        <!--Optional:-->
                        <ServiceID>CDVienDong</ServiceID>
                        <!--Optional:-->
                        <CommandCode>bulksms</CommandCode>
                        <!--Optional:-->
                        <Content>${message}</Content>
                        <!--Optional:-->
                        <ContentType>0</ContentType>
                    </impl:wsCpMt>
                </soapenv:Body>
            </soapenv:Envelope>
        `
    const result = await axios.post(
        'https://ams.tinnhanthuonghieu.vn:8998/bulkapi?wsdl',
        xmlStr,
        {
            headers: {
                "Content-Type": "text/xml"
            }
        }
    );

    if (getResultNumber(result.data) === 1) {
        return true;
    }
    else {
        await new Promise(resolve => setTimeout(resolve, 10000));
        return false;
    }
}

const send = async (cls, attendanceClass) => {
    let count = 0;
    let sentList = [];
    const now = new Date();
    try {
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
            if (student && student.sdt_cha_me) {
                let success = await sendMessage(student.sdt_cha_me, `Ban ${removeVietnameseAccent(e?.name)} da diem danh vao hoc luc ${moment(now).format("hh:mm A, DD/MM/YYYY")}`);
                let k = 0;
                while (!success && k < 3) {
                    success = await sendMessage(student.sdt_cha_me, `Ban ${removeVietnameseAccent(e?.name)} da diem danh vao hoc luc ${moment(now).format("hh:mm A, DD/MM/YYYY")}`);
                    k++;
                }
                if (success) {
                    count++;
                    const index = cls.students.findIndex(student => student.mssv === e?.mshv);
                    if(index !== -1)
                    {
                        cls.students[index].hiendien = true;
                        cls.students[index].smsSent = true;
                    }
                }
                else {
                    const index = cls.students.findIndex(student => student.mssv === e?.mshv);
                    if(index !== -1)
                    {
                        cls.students[index].hiendien = true;
                    }
                }
            }
        });
        await Promise.all(promises);
        await cls.save();
        return count;
    }
    catch (err) {
        console.log("Send: ", err);
    }
}

const sendSMS2 = async (data) => {
    const serviceURL = "http://ams.tinnhanthuonghieu.vn:8009/bulkapi?wsdl";
    try {

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
            "Phone": data.sdt_cha_me,
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

module.exports = { sendOTP, verify, sendSMS, getStatusSMS, registerTemplate, sendSMS2, sendSMSTest, generateOTP, sendOTPV2, getResultNumber };