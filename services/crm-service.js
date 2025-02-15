const { default: axios } = require("axios");
const Participant = require("../models/participant");
const Device = require("../models/device");

const getAccessToken = async () => {
    try {
        const param = {
            username: "giaotran",
            access_key_md5: "969677b1d7f282346b93c81b26e421f1"
        };
        const response = await axios.get("https://crm.viendong.edu.vn/api/OpenAPI/auth", {
            params: param,
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const postParticipant = async (data) => {
    // Hàm đệ quy để lấy access token
    const response = await getAccessToken();

    const header = {
        "Access-Token": response.access_token
    };
    try {
        const response = await axios.post("https://crm.viendong.edu.vn/api/OpenAPI/create?module=CPTarget", { data: data }, {
            headers: header,
            timeout: 100000
        });

        const newResult = new Participant({ 
            firstname: data.firstname, 
            lastname: data.lastname,
            phone: data.phone 
        });
        await newResult.save();

        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const putParticipant = async (data, record_id) => {
    // Hàm đệ quy để lấy access token
    const response = await getAccessToken();

    const header = {
        "Access-Token": response.access_token
    };
    try {
        const response = await axios.post(`https://crm.viendong.edu.vn/api/OpenAPI/update?module=CPTarget&record=${record_id}`, { data: {
            winning_code: data.winning_code
        } }, {
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