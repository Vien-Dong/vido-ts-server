const { default: axios } = require("axios");

const getAccessToken = async () => {
    try {
        const param = {
            username: "giaotran",
            access_key_md5: "969677b1d7f282346b93c81b26e421f1"
        };
        const response = await axios.get("https://crm.viendong.edu.vn/api/OpenAPI/auth", {
            params: param
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { getAccessToken };