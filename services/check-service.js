const Device = require("../models/device")

const saveDeviceId = async (data) => {
    try {
        var newDevice = new Device({ deviceId: data.deviceId, isCompleted: data.isCompleted });
        return await newDevice.save();
    }
    catch (err) {
        console.log(err);
    }
}

const getDeviceId = async (deviceId) => {
    try {
        var result = await Device.findOne({ deviceId });
        if (!result) {
            await saveDeviceId({ deviceId, isCompleted: false });
        }
        return result;
    }
    catch (err) {
        console.log(err);
    }
}

const updateDeviceId = async (data) => {
    try {
        return await Device.findOneAndUpdate({ deviceId: data.deviceId }, { isCompleted: data.isCompleted }, { new: true });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { saveDeviceId, getDeviceId, updateDeviceId }; 