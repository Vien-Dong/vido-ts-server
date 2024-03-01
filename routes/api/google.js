const express = require("express");
const { getAppDetails } = require("../../services/google-service");
const router = express.Router();

router.get('/get-app-details', async (req, res) => {
    try {
        const result = await getAppDetails();
        res.status(200).send({
            status: true,
            message: "Lấy thông tin thành công.",
            payload: result.data
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
});

module.exports = router;