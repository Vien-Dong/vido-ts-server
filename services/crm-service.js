const { default: axios } = require("axios");
const Participant = require("../models/participant");
const Device = require("../models/device");
const Redis = require("ioredis");

const redis = new Redis("rediss://default:ATvjAAIjcDExYmUyZWM1NWJlMTE0Y2RkYjY4ODMyMzliZDQ1ZTk2OHAxMA@game-martin-15331.upstash.io:6379");

// Cache trên server
let cachedToken = null;
let tokenExpiresAt = 0;

const getAccessToken = async () => {

    // 1️⃣ Kiểm tra cache trên server trước
    if (cachedToken && Date.now() < Number(tokenExpiresAt)) {
        return {
            access_token: cachedToken,
            expire_time: tokenExpiresAt / 1000
        };
    }

    // 2️⃣ Nếu không có, kiểm tra Redis
    let tokenData = await redis.get("tokenData");
    if (tokenData) {
        tokenData = JSON.parse(tokenData);
        if (Date.now() < Number(tokenData.expire_time)) {
            return {
                access_token: tokenData.access_token,
                expire_time: Number(tokenData.expire_time) / 1000
            };
        }
    }

    // 3️⃣ Nếu Redis cũng không có, gọi API lấy token mới
    try {
        const param = {
            username: "admin",
            access_key_md5: "37488f318b75565be18d3b5accb8d439"
        };
        const response = await axios.get("https://crm.viendong.edu.vn/api/OpenAPI/auth", {
            params: param,
        });

        console.log(response);

        if (response?.data) {
            console.log(response?.data);
            cachedToken = response?.data?.access_token;
            tokenExpiresAt = Number(response?.data?.expire_time ?? 0) * 1000;
            await redis.set("tokenData", JSON.stringify({
                access_token: response?.data?.access_token,
                expire_time: Number(response?.data?.expire_time ?? 0) * 1000
            }), "EX", 86400);
        }

        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const postParticipant = async (data) => {
    // Hàm đệ quy để lấy access token
    const response = await getAccessToken();

    if (!response || !response.access_token) {
        console.log("🚨 Lỗi: Không thể lấy Access Token");
        return null;
    }

    const header = {
        "Access-Token": response.access_token
    };
    try {
        const response = await axios.post("https://crm.viendong.edu.vn/api/OpenAPI/create?module=CPTarget", { data: data }, {
            headers: header,
            timeout: 100000
        });

        // const newResult = new Participant({ 
        //     firstname: data.firstname, 
        //     lastname: data.lastname,
        //     phone: data.phone 
        // });
        // await newResult.save();

        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const putParticipant = async (data, record_id) => {
    // Hàm đệ quy để lấy access token
    const response = await getAccessToken();

    if (!response || !response.access_token) {
        console.log("🚨 Lỗi: Không thể lấy Access Token");
        return null;
    }

    const header = {
        "Access-Token": response.access_token
    };
    try {
        const response = await axios.post(`https://crm.viendong.edu.vn/api/OpenAPI/update?module=CPTarget&record=${record_id}`, {
            data: {
                winning_code: data.winning_code
            }
        }, {
            headers: header,
            timeout: 100000
        });

        // await Device.findOneAndUpdate({ deviceId: data.deviceId }, { isCompleted: true }, { new: true });

        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { getAccessToken, postParticipant, putParticipant };