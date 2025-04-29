const { default: axios } = require("axios");
var querystring = require('querystring');
const Token = require("../models/zalo");
// const { getAccessToken } = require("zmp-sdk");
// const secretkey = "MT1Q59ER6vnCQD0DtKZa";
// const endpoint = "https://graph.zalo.me/v2.0/me/info";

// const getZaloNumber = async (token) => {
//     try {
//         // const accessToken = await getAccessToken({});
//         // console.log(accessToken);
//         // if (accessToken) {
//         //     const { data } = await axios.get(endpoint, {
//         //         headers: {
//         //             access_token: accessToken,
//         //             code: token,
//         //             secret_key: secretkey,
//         //         }
//         //     });
//         //     return data;
//         // };
//         return null
//     } catch (err) {
//         console.log("Get zalo number: ", err);
//         return 0;
//     }
// }

const getTokenFromDB = async () => {
    try {
        const tokens = await Token.find({ refresh_token_is_expire: false }).sort({ createdAt: 'desc' });
        if (tokens && tokens.length > 0) return tokens[0];
        return null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const getAccessToken = async () => {
    try {
        const tokenFromDB = await getTokenFromDB();

        const data = {
            refresh_token: tokenFromDB.refresh_token,
            app_id: process.env.ZALO_APP_ID,
            grant_type: process.env.ZALO_GRANT_TYPE
        };

        const res = await axios.post("https://oauth.zaloapp.com/v4/oa/access_token", querystring.stringify(data), {
            headers: {
                'secret_key': process.env.ZALO_SECRET_KEY,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        if (res && res.data) {
            if (res.data.error) {
                return "error";
            }
            else {
                const newToken = new Token({
                    access_token: res.data.access_token,
                    refresh_token: res.data.refresh_token,
                    refresh_token_is_expire: false,
                    createdAt: new Date()
                });

                await newToken.save();
                await revokeToken(tokenFromDB.refresh_token, false);

                return res.data.access_token;
            }
        }
        return "Lỗi server";
    }
    catch (error) {
        console.log("Get zalo token: ", error);
        return null;
    }
}

const getAccessTokenWhenRefreshtokenExpire = async (refreshToken) => {
    try {
        const data = {
            refresh_token: refreshToken,
            app_id: process.env.ZALO_APP_ID,
            grant_type: process.env.ZALO_GRANT_TYPE
        };

        const res = await axios.post("https://oauth.zaloapp.com/v4/oa/access_token", querystring.stringify(data), {
            headers: {
                'secret_key': process.env.ZALO_SECRET_KEY,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        if (res && res.data) {
            if (res.data.error) {
                return "Token lỗi";
            }
            else {
                await revokeToken(null, true);
                const newToken = new Token({
                    access_token: res.data.access_token,
                    refresh_token: res.data.refresh_token,
                    refresh_token_is_expire: false,
                    createdAt: new Date()
                });

                await newToken.save();

                return res.data.access_token;
            }
        }
        return "Lỗi server";
    }
    catch (error) {
        console.log("Get zalo token: ", error);
        return null;
    }
}

const revokeToken = async (refreshToken, isRevokeAll) => {
    try {
        let result = null;
        if (isRevokeAll) {
            result = await Token.updateMany(null, { $set: { refresh_token_is_expire: true } });
        }
        else {
            result = await Token.updateOne(
                { refresh_token: refreshToken },
                { $set: { refresh_token_is_expire: true } }
            );
        }
        if (result && result.modifiedCount >= 1) {
            return "Revoke thành công";
        }
        return "Không có dữ liệu để revoke";
    }
    catch (error) {
        console.log(error);
    }
}

const sendMessage = async (phone, templateId, templateData, trackingId) => {
    try {
        const data = {
            phone,
            template_id: templateId,
            template_data: templateData,
            tracking_id: trackingId
        }

        const accessToken = await getAccessToken();

        if(accessToken === "error") return "Lỗi token";

        const res = await axios.post("https://business.openapi.zalo.me/message/template", data, {
            headers: {
                "Content-Type": "application/json",
                "access_token": accessToken
            }
        });

        if(res && res.data)
        {
            if(res.data.message === "Success")
            {
                return "Gửi thành công";
            }
            return res.data;
        }
        return "Lỗi server"; 
    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports = { getAccessToken, getTokenFromDB, revokeToken, getAccessTokenWhenRefreshtokenExpire, sendMessage };