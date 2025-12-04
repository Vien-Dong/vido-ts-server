const express = require("express");
const { getFromGoogleBooks,getFromMinhKhai,getFromPhuongNam, getBookFromNhanVan, getFromCanTho, getFromFahasa, getFromVinabook} = require("../../services/book-service");
const router = express.Router();

router.get("/getBookInfo", async (req, res) => {
    const isbn = req.query.isbn;
    if (!isbn) return res.status(400).json({ message: "Missing ISBN" });

    console.log("Searching for ISBN:", isbn);

    const sources = [
        { name: "Google Books", fn: getFromGoogleBooks },
        { name: "Minh Khai", fn: getFromMinhKhai },
        { name: "Phương Nam", fn: getFromPhuongNam },
        { name: "Nhân Văn", fn: getBookFromNhanVan },
        { name: "Nhà Sách Cần Thơ", fn: getFromCanTho },
        { name: "Fahasa", fn: getFromFahasa },
        { name: "Vinabook", fn: getFromVinabook }
    ];

    let book = null;

    for (const source of sources) {
        console.log(`Trying ${source.name}...`);
        book = await source.fn(isbn);
        if (book) {
            console.log(`Found in ${source.name}`);
            break;
        } else {
            console.log(`Not found in ${source.name}`);
        }
    }

    if (!book) {
        console.log("Không tìm thấy sách trên các nguồn công khai");
    }


    res.json(book);
});

module.exports = router;