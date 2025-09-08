const express = require("express");
const Attendance = require("../../models/attendance");

const router = express.Router();

router.post("/save-attendance", async (req, res) => {
    try {
        const { mshv, deviceId, tkbId, ngay } = req.body;

        const newAttendance = new Attendance({
            mshv, deviceId, tkbId, ngay
        });

        await newAttendance.save();
        res.status(200).send({ message: "Device sent Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.get("/attendance/:ngay", async (req, res) => {
    try {
        const { ngay } = req.params;
        const attendances = await Attendance.find({ "ngay": ngay });

        res.status(200).send(attendances);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;