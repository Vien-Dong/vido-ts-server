const Device = require("../models/device")

const saveDeviceId = async (data) => {
    try {
        var newDevice = new Device({ deviceId: data.deviceId });
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
            await saveDeviceId({ deviceId });
        }
        return result;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { saveDeviceId, getDeviceId }; 