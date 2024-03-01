const { default: axios } = require("axios");

const options = {
    method: 'GET',
    url: 'https://store-apps.p.rapidapi.com/app-details',
    params: {
        app_id: 'com.vidotsmobile.vido',
        region: 'vn',
        language: 'vn'
    },
    headers: {
        'X-RapidAPI-Key': 'e2508a743fmsh1cab6f9d221140ap194c0djsn0e2b181c670a',
        'X-RapidAPI-Host': 'store-apps.p.rapidapi.com'
    }
};

const getAppDetails = async () => {
    try {
        return await axios.request(options);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getAppDetails };