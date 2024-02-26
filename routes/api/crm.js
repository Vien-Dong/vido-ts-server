const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const { getAccessToken } = require("../../services/crm-service");

router.post('/create-cptarget', async (req, res) => {
    const data = req.body;

    // Hàm đệ quy để lấy access token
    const getAccessTokenRecursive = async () => {
        try {
            const response = await getAccessToken();
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    let accessTokenResponse;
    do {
        accessTokenResponse = await getAccessTokenRecursive();
    } while (!accessTokenResponse || !accessTokenResponse.access_token);

    if (accessTokenResponse && accessTokenResponse.access_token) {
        const header = {
            "Access-Token": accessTokenResponse.access_token
        };
        try {
            await axios.post("https://crm.viendong.edu.vn/api/OpenAPI/create?module=CPTarget", { data: data }, {
                headers: header,
                timeout: 100000
            }).then(() => {
                res.status(200).send({
                    success: true,
                    message: "Tạo khách hàng thành công."
                })
            }).catch((error) => {
                res.status(400).send('Something went wrong!');
                console.log(error);
            })
        }
        catch (error) {
            console.log(error);
        }
    } else {
        res.status(200).send({
            success: false,
            message: "Lỗi access token"
        })
    }
});

module.exports = router;