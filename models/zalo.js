const { default: mongoose } = require("mongoose");

const tokenSchema = new mongoose.Schema({
    access_token: {
        type: String,
        require: true
    },
    refresh_token: {
        type: String,
        require: true
    },
    refresh_token_is_expire: {
        type: Boolean,
        require: true
    },
    createdAt: {
        type: Date,
        require: true
    }
})

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;