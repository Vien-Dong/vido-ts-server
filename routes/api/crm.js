const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const { getAccessToken } = require("../../services/crm-service");

router.post('/create-cptarget', async (req, res) => {
    const data = req.body;

    // Hàm đệ quy để lấy access token
    const response = await getAccessToken();

    const header = {
        "Access-Token": response.access_token
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
});

router.get('/get-token', async (req, res) => {
    await getAccessToken().then((res) => {
        res.status(200).send(res.data);
    }).catch((error) => res.status(400).send(error));
});

module.exports = router;