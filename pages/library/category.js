const categoryMenu = document.querySelector("#category-container");

function fetchCategory() {
    const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS10aHV2aWVuLnZpZW5kb25nLmVkdS52bi9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTczMTQzNjcyMiwiZXhwIjoxNzMxNDM3NjIyLCJuYmYiOjE3MzE0MzY3MjIsImp0aSI6IkdybHBTS2IySlE0N25aNGciLCJzdWIiOiIxMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.w3e9ThJbury-8YJNO1bOktDDXZcFUr9aapXKSRxemWk";

    axios.get("https://api-thuvien.viendong.edu.vn/api/category/", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
        .then(response => {
            const categories = response.data.data;
            renderCategory(categories);
        })
        .catch(error => {
            console.error("Lỗi khi lấy dữ liệu danh mục:", error);
        });
}

function getRandomReadableColor() {
    let color;
    do {
        color = getRandomHexColorWithBrightness(70, 180); // Adjust brightness range if needed
    } while (!isReadableForWhite(color));
    return color;
}

function getRandomHexColorWithBrightness(minBrightness, maxBrightness) {
    const r = Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness);
    const g = Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness);
    const b = Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness);
    return rgbToHex(r, g, b);
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function isReadableForWhite(color) {
    // Convert hex to RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    // Calculate brightness
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
    // Ensure brightness is neither too dark nor too light for white text
    return brightness < 200 && brightness > 100;
}

function renderCategory(categories) {
    categoryMenu.innerHTML = ""; // Xóa nội dung cũ của menu

    categories.forEach(category => {
        const categoryItem = document.createElement("a");
        categoryItem.className = "category-btn";
        categoryItem.style = `background: ${getRandomReadableColor()}`

        categoryItem.innerHTML = category.CategoryName;

        categoryMenu.appendChild(categoryItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchCategory();
});
