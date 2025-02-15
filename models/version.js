const { default: mongoose } = require("mongoose");

const versionSchema = new mongoose.Schema({
    package: {
        type: String,
        required: true
    },
    version: {
        type: String,
        require: true
    },
    dateUpdated: {
        type: String,
        required: true
    }
})

const Version = mongoose.model("Version", versionSchema);
module.exports = Version;