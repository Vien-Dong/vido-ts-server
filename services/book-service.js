const { default: axios } = require("axios");
const cheerio = require('cheerio');

const getBookInfo = async (isbn) => {
    try {
        const icheckPromise = await axios.get(`${process.env.ICHECK_API_URL}/products/search?nameCode=${isbn}&limit=48&offset=0`, {
            headers: {
                "Authorization": `Bearer ${process.env.ICHECK_TOKEN}`
            }
        });
        const googleBooksPromise = await axios.get(`${process.env.GOOGLE_BOOK_URL}/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_API_KEY}`);

        const phuongnamPromise = await axios.get(process.env.PHUONG_NAM_URL, {
            params: {
                match: "all",
                subcats: "Y",
                pcode_from_q: "Y",
                pshort: "N",
                pfull: "N",
                pname: "Y",
                pkeywords: "Y",
                search_performed: "Y",
                q: isbn,
                dispatch: "products.search"
            }
        });

        const minhkhaiPromise = await axios.get(process.env.MINH_KHAI_URL, {
            params: {
                q: "view",
                isbn
            }
        });

        const responses = await Promise.allSettled([phuongnamPromise, minhkhaiPromise, googleBooksPromise]);

        const successfulResponses = responses
            .filter(response => response.status === "fulfilled" && response.value?.data)
            .map(response => response.value.data);

        const result = successfulResponses.map((data, index) => {
            if (data && typeof data === 'string') {
                const $ = cheerio.load(data);
                const bookInfo = {};

                // Ánh xạ thuộc tính
                const propertyMap = {
                    "Kích thước": "dimension",
                    "Năm Xuất Bản": "publishYear",
                    "Số trang": "pageCount",
                    "Tác giả": "author",
                    "Nhà Xuất Bản": "publisher",
                    "Đơn Vị Liên Kết Xuất Bản": "studio",
                    "Dịch giả": "translator",
                    "Loại sản phẩm": "type"
                };

                if (index === 0) { // Phản hồi từ Phương Nam
                    bookInfo.title = $('#tygh_main_container > div.tygh-content.clearfix > div > div > div > div > div.ut2-pb.ty-product-block.ty-product-detail.ut2-big-image > div.ut2-pb__wrapper.clearfix > div.ut2-pb__title > h1 > bdi').text().trim() || "";

                    const features = $('.ty-product-feature');

                    if (features.length > 0) {
                        features.each((_, feature) => {
                            const label = $(feature).find('.ty-product-feature__label span').text().trim();
                            let value = $(feature).find('.ty-product-feature__value').text().trim();

                            // Kiểm tra danh sách nhiều mục
                            const multipleList = $(feature).find('.ty-product-feature__multiple-item');
                            if (multipleList.length > 0) {
                                value = multipleList.map((_, item) => $(item).contents().not($(item).find('input')).text().trim()).get().join(', ');
                            }

                            // Gán giá trị theo ánh xạ
                            if (propertyMap[label]) {
                                bookInfo[propertyMap[label]] = value;
                            }
                        });

                        return {
                            totalItem: 1,
                            items: [bookInfo],
                            source: "phuongnam"
                        };
                    }

                    return null;
                } else if (index === 1) { // Phản hồi từ Minh Khai
                    const selector = $('body > div:nth-child(5) > div:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(2)');

                    if (selector.length > 0) {
                        // Trích xuất các thông tin
                        bookInfo.title = $(selector).find('b').first().text().trim(); // Tiêu đề

                        // Tác giả
                        const authorMatch = $(selector).find('span').html().match(/Tác giả:\s*(.*?)\.\s*(?:Dịch giả|Bản dịch tiếng Việt|Người dịch|Chấp bút):/);
                        bookInfo.author = authorMatch ? authorMatch[1].replace(/<\/?a[^>]*>/g, '').trim() : null;

                        // Bản dịch tiếng Việt
                        const translatorMatch = $(selector).find('span').html().match(/(?:Dịch giả|Bản dịch tiếng Việt|Người dịch|Chấp bút):\s*<a[^>]*>(.*?)<\/a>/);
                        bookInfo.translator = translatorMatch ? translatorMatch[1].trim() : null;

                        // Thể loại
                        const categoryMatch = $(selector).find('a[href*="CategoryID"]').text();
                        bookInfo.category = categoryMatch ? categoryMatch.trim() : '';

                        // ISBN
                        bookInfo.isbn = $(selector).find('b:contains("ISBN:")').text().replace('ISBN: ', '').trim();

                        const nodeText = $(selector).find('b:contains("Xuất bản:")').parent().contents().filter(function () {
                            return this.nodeType === 3;
                        }).text().trim();

                        if (nodeText) {
                            const parts = nodeText.split('\n').map(part => part.trim()).filter(part => part !== '');

                            // Năm xuất bản
                            bookInfo.publishYear = Number(parts[1].split('/')[1]);

                            // Trọng lượng
                            bookInfo.weight = parts[2];

                            // Số trang
                            bookInfo.pageCount = Number(parts[3].split(' ')[0]); // Lấy số trang từ chuỗi
                        }

                        // Nhà xuất bản
                        bookInfo.publisher = $(selector).find('b:contains("NXB:")').next().text().trim();

                        return {
                            totalItem: 1,
                            items: [bookInfo],
                            source: "minhkhai"
                        };
                    }
                    return null;
                }

                return null;
            }
        }).find(x => x !== null && x !== undefined);

        const googleBooksData = successfulResponses.find(data => data.totalItems > 0);

        if (googleBooksData) {
            return {
                totalItem: googleBooksData.totalItems,
                items: googleBooksData.items,
                source: "google"
            }
        }

        const icheckData = successfulResponses.find(data => data.data?.count > 0);
        if (icheckData) {
            return {
                totalItem: icheckData.data.count,
                items: icheckData.data.rows && icheckData.data.rows.length > 0 ? icheckData.data.rows.filter(x => x?.sourceId !== null) : [],
                source: "icheck"
            };
        }

        return result || null;
    }
    catch (error) {
        console.log(error);
    }
}

const crawlData = async (isbn) => {
    try {
        const res = await axios.get(process.env.PHUONG_NAM_URL, {
            params: {
                match: "all",
                subcats: "Y",
                pcode_from_q: "Y",
                pshort: "N",
                pfull: "N",
                pname: "Y",
                pkeywords: "Y",
                search_performed: "Y",
                q: isbn,
                dispatch: "products.search"
            }
        });
        if (res.data) {
            const $ = cheerio.load(res.data);
            const bookInfo = {};
            const features = $('.ty-product-feature');

            const propertyMap = {
                "Kích thước": "dimension",
                "Năm Xuất Bản": "publishYear",
                "Số trang": "pageCount",
                "Tác giả": "author",
                "Nhà Xuất Bản": "publisher",
                "Đơn Vị Liên Kết Xuất Bản": "studio",
                "Dịch giả": "translator",
                "Loại sản phẩm": "type"
            };

            bookInfo.title = $('#tygh_main_container > div.tygh-content.clearfix > div > div > div > div > div.ut2-pb.ty-product-block.ty-product-detail.ut2-big-image > div.ut2-pb__wrapper.clearfix > div.ut2-pb__title > h1 > bdi')?.text()?.trim() || "";

            features.each((index, feature) => {
                const label = $(feature).find('.ty-product-feature__label span').text().trim();
                let value = $(feature).find('.ty-product-feature__value').text().trim();

                // Nếu giá trị chứa phần tử danh sách, cần phải lấy giá trị từ các phần tử con
                const multipleList = $(feature).find('.ty-product-feature__multiple-item');
                if (multipleList.length > 0) {
                    value = multipleList.map((_, item) => $(item).contents().not($(item).find('input')).text().trim()).get().join(', ');
                }

                // Kiểm tra và gán giá trị vào bookInfo theo ánh xạ
                if (propertyMap[label]) {
                    bookInfo[propertyMap[label]] = value;
                }
            });

            console.log(bookInfo);
        }

        return null;
    } catch (err) {
        return {
            success: false,
            message: "Lỗi hệ thống.",
            status: 400
        };
    }
}

module.exports = { getBookInfo, crawlData };