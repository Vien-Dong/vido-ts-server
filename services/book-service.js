const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

function normalizeBook({
  source = "",
  title = "",
  publisher = "",
  isbn = "",
  authors = [],
  price = "",
  thumbnail = "",
  description = "",
  link = ""
}) {
  return {
    source,
    title,
    publisher,
    isbn,
    authors,
    price,
    thumbnail,
    description,
    link
  };
}


// 1️⃣ Google Books
async function getFromGoogleBooks(isbn) {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    const { data } = await axios.get(url);
    if (!data.items?.length) return null;

    const b = data.items[0].volumeInfo;

    return normalizeBook({
      source: "Google Books",
      title: b.title || "",
      publisher: b.publisher || "",
      isbn: isbn,
      authors: b.authors || [],
      description: b.description || "",
      thumbnail: b.imageLinks?.thumbnail || ""
    });
  } catch {
    return null;
  }
}

// 2️⃣ Phương Nam
async function getFromPhuongNam(isbn) {
  try {
    const searchUrl = `https://nhasachphuongnam.com/search?type=product&q=${isbn}`;
    const { data: searchHtml } = await axios.get(searchUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const $ = cheerio.load(searchHtml);

    const firstLink = $(".product-thumbnail a.image_thumb").first().attr("href");
    if (!firstLink) return null;

    const productLink =
      firstLink.startsWith("http") ? firstLink : `https://nhasachphuongnam.com${firstLink}`;

    const { data: detailHtml } = await axios.get(productLink, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const $d = cheerio.load(detailHtml);

    const foundIsbn = $d("p.product_sku .status_name").text().trim();
    if (foundIsbn !== isbn) return null;

    return normalizeBook({
      source: "Phương Nam",
      title: $d("h1.title-product").text().trim(),
      publisher: "",
      isbn: foundIsbn,
      price: $d(".price-box .product-price").text().trim(),
      thumbnail: $d(".slider-for img").attr("src") || "",
      link: productLink
    });

  } catch {
    return null;
  }
}

// 3️⃣ Nhân Văn
async function getBookFromNhanVan(isbn) {
  try {
    const searchUrl = `https://nhanvan.vn/search?q=${isbn}`;
    const { data: html } = await axios.get(searchUrl);
    const $ = cheerio.load(html);

    const products = $(".pro-loop");
    if (!products.length) return null;

    for (let i = 0; i < products.length; i++) {
      const item = products.eq(i);
      const detailLink = item.find(".pro-name a").attr("href");
      if (!detailLink) continue;

      const productLink = detailLink.startsWith("http")
        ? detailLink
        : `https://nhanvan.vn${detailLink}`;

      const { data: detailHtml } = await axios.get(productLink);
      const $d = cheerio.load(detailHtml);

      const sku = $d("div#productDetail p.sku").text().replace("SKU:", "").trim();

      if (sku === isbn) {
        return normalizeBook({
          source: "Nhân Văn",
          title: $d("div#productDetail h1").text().trim(),
          publisher: "",
          isbn: sku,
          link: productLink
        });
      }
    }

    return null;
  } catch {
    return null;
  }
}

// 4️⃣ Minh Khai
async function getFromMinhKhai(isbn) {
  try {
    const url = `https://minhkhai.com.vn/store2/index.aspx?q=view&isbn=${isbn}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const isbnText = $("td b:contains('ISBN')").text().replace("ISBN:", "").trim();
    if (isbnText !== isbn) return null;

    return normalizeBook({
      source: "Minh Khai",
      title: $("td b").first().text().trim(),
      publisher: $("td b:contains('NXB')").next("a").text().trim(),
      isbn: isbn,
      authors: $("td span:contains('Tác giả')")
        .text()
        .replace("Tác giả:", "")
        .split("-")
        .map(a => a.trim())
        .filter(a => a),
      publishedDate: $("td b:contains('Xuất bản')").parent().text().replace("Xuất bản:", "").trim(),
      thumbnail: $("td img").first().attr("src")
        ? "https://minhkhai.com.vn" + $("td img").first().attr("src")
        : "",
      link: url
    });

  } catch {
    return null;
  }
}

/**
 * Lấy sách từ Nhà Sách Cần Thơ bằng Google Custom Search API
 * @param {string} isbn
 */
async function getFromCanTho(isbn) {
  try {
    const GOOGLE_API_KEY = "YOUR_KEY";
    const SEARCH_ENGINE_ID = "YOUR_CX";

    const query = encodeURIComponent(`${isbn} site:nhasachcantho.vn`);
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`;

    const { data: searchData } = await axios.get(url);
    if (!searchData.items?.length) return null;

    const productLink = searchData.items.find(item =>
      item.link.includes("nhasachcantho.vn")
    )?.link;
    if (!productLink) return null;

    const { data: html } = await axios.get(productLink);
    const $ = cheerio.load(html);
    const desc = $(".product-description").text();

    return normalizeBook({
      source: "Nhà Sách Cần Thơ",
      title: $("h1.product-title").text().trim(),
      publisher: $("h3.product-subtitle").text().trim(),
      isbn: extractISBN(desc),
      price: $(".price .current").text().trim(),
      thumbnail: $(".product-gallery img").attr("src") || "",
      description: desc.trim(),
      link: productLink
    });

  } catch {
    return null;
  }
}

// ⚡ Tự động lấy ISBN 13 số từ description
function extractISBN(text) {
  if (!text) return null;

  // Bắt chuỗi 13 số liên tục, dù trước/sau dính chữ
  const match = text.match(/(\d{13})/);

  return match ? match[1] : null;
}

// -----------------------------------------------------------------------------
// 6️⃣ Fahasa
// -----------------------------------------------------------------------------
async function getFromFahasa(isbn) {
  const searchUrl = `https://www.fahasa.com/searchengine?q=${isbn}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled"
    ],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  try {
    await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

    // đợi trang render lazy load
    await new Promise(resolve => setTimeout(resolve, 3000));

    const result = await page.evaluate(() => {
      const first = document.querySelector("ul.products-grid.fhs-top > li");
      if (!first) return null;

      const linkEl = first.querySelector("a[href]");
      const titleEl = first.querySelector("h2.product-name-no-ellipsis a");
      const priceEl = first.querySelector("span.price.m-price-font");
      const imgEl = first.querySelector("img");

      return {
        link: linkEl?.href || null,
        title: titleEl?.innerText?.trim() || null,
        price: priceEl?.innerText?.trim() || null,
        thumbnail: imgEl?.src || null,
      };
    });

    if (!result || !result.link) return null;

    return {
      source: "Fahasa",
      isbn,
      ...result
    };

  } catch (err) {
    console.error("Fahasa error:", err);
    return null;
  } finally {
    await browser.close();
  }
}

// -----------------------------------------------------------------------------
// 8️⃣ Vinabook
// -----------------------------------------------------------------------------
async function getFromVinabook(isbn) {
  try {
    const searchUrl = `https://www.vinabook.com/search?q=${isbn}`;
    const { data: html } = await axios.get(searchUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(html);

    // --- SEARCH PAGE ---
    const item = $(".product-item").first();
    if (!item.length) return null;

    const title = item.find("h3.pro-name a").text().trim();
    const link = "https://www.vinabook.com" + item.find("h3.pro-name a").attr("href");
    const thumbnail = item.find(".product-img img").attr("src");
    const price = item.find(".current-price").text().trim();

    // --- GET DETAIL PAGE ---
    const { data: detailHTML } = await axios.get(link, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $$ = cheerio.load(detailHTML);

    // TITLE
    const detailTitle = $$(".product-title h1").text().trim() || title;

    // PUBLISHER (dòng dưới SKU)
    const publisher = $$(".product-type").text().trim() || "";

    // PRICE (lấy lại nếu cần)
    const detailPrice = $$("#price-preview .pro-price").text().trim() || price;

    // THUMBNAIL
    const detailThumb =
      $$(".product-image-feature").attr("src")?.trim() || thumbnail;

    // DESCRIPTION (GIỚI THIỆU SÁCH)
    const descriptionHTML = $$("#nav-home").html() || "";
    const descriptionText = $$.text(descriptionHTML).replace(/\s+/g, " ").trim();

    // INFO TABLE
    let authors = [];
    let publishYear = "";
    let pageCount = "";
    let isbnDetail = "";
    let translator = "";
    let supplier = "";

    $$("#nav-home table tr").each((_, tr) => {
      const key = $$(tr).find("th").text().trim();
      const value = $$(tr).find("td").text().trim();

      if (key.includes("Tác giả")) authors.push(value);
      if (key.includes("Năm XB")) publishYear = value;
      if (key.includes("Số trang")) pageCount = value;
      if (key.includes("Mã hàng")) isbnDetail = value;
      if (key.includes("Người Dịch")) translator = value;
      if (key.includes("Tên Nhà Cung Cấp")) supplier = value;
    });

    return normalizeBook({
      source: "Vinabook",
      title: detailTitle,
      publisher,
      isbn: isbnDetail || isbn,
      authors,
      published_date: publishYear,
      pages: pageCount,
      translator,
      supplier,
      price: detailPrice,
      thumbnail: detailThumb,
      description: descriptionText,
      link
    });

  } catch (err) {
    console.error("Vinabook error:", err);
    return null;
  }
}


module.exports = { getFromGoogleBooks, getFromMinhKhai, getFromPhuongNam, getBookFromNhanVan, getFromCanTho, getFromFahasa, getFromVinabook };