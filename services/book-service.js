const { default: axios } = require("axios");

const getBookInfo = async (isbn) => {
    try {
        const icheckPromise = await axios.get(`${process.env.ICHECK_API_URL}/products/search?nameCode=${isbn}&limit=48&offset=0`, {
            headers: {
                "Authorization": `Bearer ${process.env.ICHECK_TOKEN}`
            }
        });
        const googleBooksPromise = await axios.get(`${process.env.GOOGLE_BOOK_URL}/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_API_KEY}`);

        const responses = await Promise.allSettled([googleBooksPromise, icheckPromise]);

        const successfulResponses = responses
            .filter(response => response.status === "fulfilled" && response.value?.data)
            .map(response => response.value.data);

        const googleBooksData = successfulResponses.find(data => data.totalItems > 0);

        if (googleBooksData) {
            return {
                totalItem: googleBooksData.totalItems,
                items: googleBooksData.items
            }
        }

        const icheckData = successfulResponses.find(data => data.data?.count > 0);
        if (icheckData) {
            return {
                totalItem: icheckData.data.count,
                items: icheckData.data.rows
            };
        }

        return null;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { getBookInfo };