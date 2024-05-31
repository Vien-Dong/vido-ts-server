const { default: axios } = require("axios");
const cheerio = require('cheerio');

const crawlData = async () => {
    try {
        const res = await fetch("https://www.viendong.edu.vn/");
        const htmlString = await res.text();
        const $ = cheerio.load(htmlString);
        const containerLeftHTML = $("#home-news-main-v2 > div > div > div.col-lg-9.left > div.row > div.col-lg-6.col-md-6.box.one");
        const containerRightHTML = $("#home-news-main-v2 > div > div > div.col-lg-9.left > div.row > div.col-lg-6.col-md-6.box.two > div > div");
        const containerBottomHTML = $("#home-news-main-v2 > div > div > div.col-lg-3.right > div.items > div");
        const leftDatas = {
            title: containerLeftHTML.first().find(".title").find("a").text(),
            tag: containerLeftHTML.first().find(".text").find(".category").text().replace(/\n/g, "").trim(),
            img: containerLeftHTML.first().find(".image-cover").find("img").attr("src"),
            url: containerLeftHTML.first().find(".title").find("a").attr("href")
        }
        const rightDatas = containerRightHTML.map((index, div) => {
            const title = $(`#home-news-main-v2 > div > div > div.col-lg-9.left > div.row > div.col-lg-6.col-md-6.box.two > div > div:nth-child(${index + 1}) > div.text > p > a`).text();
            const tag = $(`#home-news-main-v2 > div > div > div.col-lg-9.left > div.row > div.col-lg-6.col-md-6.box.two > div > div:nth-child(${index + 1}) > div.text > div > a`).text().replace(/\n/g, "").trim();
            const img = $(`#home-news-main-v2 > div > div > div.col-lg-9.left > div.row > div.col-lg-6.col-md-6.box.two > div > div:nth-child(${index + 1}) > div.image.image-cover > a > img`).attr("src");
            const url = $(`#home-news-main-v2 > div > div > div.col-lg-9.left > div.row > div.col-lg-6.col-md-6.box.two > div > div:nth-child(${index + 1}) > div.text > p > a`).attr("href");

            return {
                title,
                tag,
                img,
                url
            };
        }).get();

        const bottomDatas = containerBottomHTML.map((index, div) => {
            const title = $(`#home-news-main-v2 > div > div > div.col-lg-3.right > div.items > div:nth-child(${index + 1}) > div > p > a:nth-child(2)`).text();
            const tag = "";
            const img = $(`#home-news-main-v2 > div > div > div.col-lg-3.right > div.items > div:nth-child(${index + 1}) > a > div > img`).attr("src");
            const url = $(`#home-news-main-v2 > div > div > div.col-lg-3.right > div.items > div:nth-child(${index + 1}) > a`).attr("href");

            return {
                title,
                tag,
                img,
                url
            };
        }).get();

        const newObject = {
            leftNew: leftDatas,
            rightNews: rightDatas,
            bottomNews: bottomDatas,
        }
        
        return newObject;
    } catch (err) {
        return {
            success: false,
            message: "Lỗi hệ thống.",
            status: 400
        };
    }
}

module.exports = { crawlData };