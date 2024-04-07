// const { default: axios } = require("axios");
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

// module.exports = { getZaloNumber };