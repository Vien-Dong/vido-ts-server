// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC69326f691746aaf871274ee40bc0f65b";
const authToken = "71e4b6671a8ba3c21e1d20994220384c";
const verifySid = "VA03c4f379e8e44e0c2551e9a29c87bacf";
const client = require("twilio")(accountSid, authToken);

const sendOTP = async (phone) => {
    try {
        return await client.verify.v2.services(verifySid)
            .verifications.create({ to: phone, channel: "sms" });
    }
    catch (err) {
        throw err;
    }
}

const verify = async (phone, code) => {
    try {
        return await client.verify.v2.services(verifySid)
            .verificationChecks.create({ to: phone, code: code });
    }
    catch (err) {
        throw err;
    }
}

const sendSMS = async (phone, message) => {
    try {
        return await client.messages.create({ body: message, from: '+19287667631', to: phone });
    }
    catch (err) {
        throw err;
    }
}

module.exports = { sendOTP, verify, sendSMS };