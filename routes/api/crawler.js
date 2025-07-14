const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const he = require('he'); // HTML entity decoder

const router = express.Router();

// GET endpoint to crawl data
router.get('/crawl/:id', async (req, res) => {
    const { id } = req.params;
    const list = [];

    try {
        const response = await axios.get(`https://vietnamnet.vn/giao-duc/diem-thi/tra-cuu-diem-thi-tot-nghiep-thpt/2025/${id}.html`);
        const html = response.data;

        const $ = cheerio.load(html);
        const rows = $('table tbody tr'); // chọn trực tiếp table nếu chắc chắn là duy nhất

        rows.each((index, row) => {
            const subjectHtml = $(row).find('td').eq(0).html();
            const scoreHtml = $(row).find('td').eq(1).html();

            if (subjectHtml && scoreHtml) {
                const result = {
                    subject: he.decode(subjectHtml.trim()),
                    score: scoreHtml.trim()
                };
                list.push(result);
            }
        });
    } catch (err) {
        console.error('Error occurred:', err.message);
        return res.json(list); // return empty list như C#
    }

    return res.json(list);
});

router.get('/crawl-highschool', async (req, res) => {
    const { name, sbd, birth } = req.query;

    const list = [];

    try {
        const url = `https://vietnamnet.vn/newsapi-edu/EducationStudentScore/CheckCandidateNumber?ComponentId=COMPONENT002297&PageId=95be1729ac2745ba9e873ef1f8f66254&birthDate=${encodeURIComponent(birth)}&fullName=${encodeURIComponent(name)}&sbd=${encodeURIComponent(sbd)}&type=1&year=2025`;
        const response = await axios.get(url);
        return res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        return res.json(list);
    }
});

module.exports = router;