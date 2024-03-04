const { default: axios } = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");
const Version = require("../models/version");

const getDateUpdated = async (package) => {
    try {
        const result = await axios.get("https://play.google.com/store/apps/details?id=com.vidotsmobile.vido");
        const versionFromDB = await getVersionFromDB("com.vidotsmobile.vido");
        const html = result.data;
        const $ = cheerio.load(html);
        const dateUpdated = $('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div.tU8Y5c > div.wkMJlb.YWi3ub > div > div.qZmL0 > div:nth-child(1) > c-wiz:nth-child(2) > div > section > div > div.TKjAsc > div > div.xg1aie');
        const format = moment(dateUpdated).format("DD/MM/YYYY");
        if(!versionFromDB) {
            await createVersion(package, format);
            return false;
        };
        if(format !== versionFromDB?.dateUpdated)
        {
            return true;
        }
        return false;
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

const createVersion = async (package, dateUpdated) => {
    try {
        const version = new Version({
            package: package,
            dateUpdated: dateUpdated
        });
        await version.save();
    } catch (error) {
        console.log(error);
    }
}

const updateVersion = async (package, dateUpdated) => {
    try {
        const version = await getVersionFromDB(package);
        version.dateUpdated = dateUpdated;
        await version.save();
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getDateUpdated, getVersionFromDB, updateVersion };