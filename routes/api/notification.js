const { default: axios } = require("axios");
const express = require("express");
const { getDocs, collection } = require("firebase/firestore");
const { database } = require("../../config/firebase");

const router = express.Router();
const chunkSize = 500;

router.get("/get", async (req, res) => {
    try {
        const tokenCol = collection(database, "users");
        const data = await getDocs(tokenCol);
        const fcmTokens = data.docs.map(doc => doc.data()?.fcmToken);
        res.status(200).send({
            fcmTokens: fcmTokens.filter(x => x != null)
        });
    }
    catch (err) {
        res.status(400).send('Something went wrong!');
        console.log(err);
    }
})

router.post("/send", (req, res) => {
    var notification = {
        title: req.body.title,
        body: req.body.message,
    }

    let totalSuccessCount = 0;
    let totalFailureCount = 0;
    var fcm_tokens = req.body.fcmTokens;

    const headers = {
        'Authorization': 'key=' + process.env.SERVER_KEY,
        'Content-Type': 'application/json'
    }

    try {
        for (let i = 0; i < fcm_tokens.length; i += chunkSize) {
            const chunk = fcm_tokens.slice(i, i + chunkSize);
            var notification_body = {
                "registration_ids": chunk,
                "notification": notification,
            }

            axios.post("https://fcm.googleapis.com/fcm/send", notification_body, {
                headers: headers
            }).then((response) => {
                totalSuccessCount += response.data.success;
                totalFailureCount += response.data.failure;
                res.status(200).send({
                    success: totalSuccessCount,
                    failure: totalFailureCount
                });
            }).catch((err) => {
                res.status(400).send('Something went wrong!');
                console.log(err);
            })
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;