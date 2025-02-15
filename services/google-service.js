const { default: axios } = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");
const Version = require("../models/version");

const getDateUpdated = async (package) => {
    try {
        const result = await axios.get(`https://play.google.com/store/apps/details?id=${package}`);
        const html = result.data;
        const $ = cheerio.load(html);
        const dateUpdated = $('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div.tU8Y5c > div.wkMJlb.YWi3ub > div > div.qZmL0 > div:nth-child(1) > c-wiz:nth-child(2) > div > section > div > div.TKjAsc > div > div.xg1aie').text();
        console.log(dateUpdated);
        const format = moment(new Date(dateUpdated)).format("DD/MM/YYYY");
        return format;
    } catch (error) {
        console.error(error);
    }
}

const getVersionFromDB = async (package) => {
    try {
        return await Version.findOne({ "package": package });
    } catch (error) {
        console.log(error);
    }
}

const checkVersion = async (package, version) => {
    try {
        const dateUpdate = await getDateUpdated(package);
        if(!dateUpdate) return false;
        const versionDB = await getVersionFromDB(package);
        if(!versionDB)
        {
            await createVersion(package, dateUpdate, version);
            return false;
        }
        if(getParts(versionDB.dateUpdated).getTime() == getParts(dateUpdate).getTime()) {
            return versionDB.version !== version;
        }
        await updateVersion(package, dateUpdate, increaseVersion(versionDB.version));
        return true;
    } catch (error) {
        console.log(error);
    }
}

const increaseVersion = (version) => {
    const parts = version.split('.');
    const major = parseInt(parts[0]);
    let minor = parseInt(parts[1]);

    // Tăng giá trị minor lên 1
    minor++;

    // Kiểm tra nếu minor vượt quá 99, thì tăng giá trị major và đặt minor về 0
    if (minor > 99) {
        parts[0] = (major + 1).toString();
        parts[1] = '00';
    } else {
        // Đảm bảo minor luôn có hai chữ số
        parts[1] = minor.toString().padStart(2, '0');
    }

    return parts.join('.');
}

const getParts = (value) => {
    const parts = value.split("/");
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
};

const createVersion = async (package, dateUpdated, version) => {
    try {
        const newVersion = new Version({
            package: package,
            dateUpdated: dateUpdated,
            version: version
        });
        await newVersion.save();
    } catch (error) {
        console.log(error);
    }
}

const updateVersion = async (package, dateUpdated, version) => {
    try {
        const oldVersion = await getVersionFromDB(package);
        oldVersion.dateUpdated = dateUpdated;
        oldVersion.version = version;
        await oldVersion.save();
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getDateUpdated, getVersionFromDB, updateVersion, checkVersion };