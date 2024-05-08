const { default: axios } = require("axios");
const cheerio = require('cheerio');

const crawlData = async () => {
    try {
        const res = await fetch("https://www.viendong.edu.vn/");
        const htmlString = await res.text();
        const $ = cheerio.load(htmlString);
        const containerLeftHTML = $("#home-news-main > div > div > div.box.one > div.news.d-flex > div.i-news.left");
        const containerRightHTML = $("#home-news-main > div > div > div.box.one > div.news.d-flex > div.i-news.right > div");
        const leftDatas = {
            title: containerLeftHTML.first().find(".title").find("a").text(),
            tag: containerLeftHTML.first().find(".text").find(".category").text().replace(/\n/g, "").trim(),
            img: containerLeftHTML.first().find(".image-cover").find("img").attr("src"),
            url: containerLeftHTML.first().find(".title").find("a").attr("href")
        }
        const rightDatas = containerRightHTML.map((index, div) => {
            const title = $(`#home-news-main > div > div > div.box.one > div.news.d-flex > div.i-news.right > div:nth-child(${index + 1}) > div.text > p.title > a`).text();
            const tag = $(`#home-news-main > div > div > div.box.one > div.news.d-flex > div.i-news.right > div:nth-child(${index + 1}) > div.text > a`).text().replace(/\n/g, "").trim();
            const img = $(`#home-news-main > div > div > div.box.one > div.news.d-flex > div.i-news.right > div:nth-child(${index + 1}) > div.image.image-cover > a > img`).attr("src");
            const url = $(`#home-news-main > div > div > div.box.one > div.news.d-flex > div.i-news.right > div:nth-child(${index + 1}) > div.text > p.title > a`).attr("href");

            return {
                title,
                tag,
                img,
                url
            };
        }).get();
        const newObject = {
            leftNew: leftDatas,
            rightNews: rightDatas
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