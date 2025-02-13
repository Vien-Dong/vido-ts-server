const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const { getAccessToken, postParticipant, putParticipant } = require("../../services/crm-service");

router.post('/create-cptarget', async (req, res) => {
    const data = req.body;

    try {
        const result = await postParticipant(data);
        res.status(200).send({
            success: true,
            message: "Tạo khách hàng thành công.",
            payload: result
        });
    }
    catch (error) {
        console.log(error);
    }
});

router.put('/update-cptarget', async (req, res) => {
    const record_id = req.query.record_id;
    const data = req.body;

    try {
        const result = await putParticipant(data, record_id);   
        res.status(200).send({
            success: true,
            message: "Tạo khách hàng thành công.",
            payload: result
        });
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/get-token', async (req, res) => {
    await axios.get("https://crm.viendong.edu.vn/api/OpenAPI/auth", {
        params: {
            username: "giaotran",
            access_key_md5: "969677b1d7f282346b93c81b26e421f1"
        }
    }).then((result) => {
        res.status(200).send(result.data);
    }).catch((error) => res.status(500).send("Error: ", error));
});

module.exports = router;