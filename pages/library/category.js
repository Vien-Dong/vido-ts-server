const categoryMenu = document.querySelector("#category-menu");

function fetchCategory() {
    const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS10aHV2aWVuLnZpZW5kb25nLmVkdS52bi9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTczMTQ1ODk3MCwiZXhwIjoxNzMxNDU5ODcwLCJuYmYiOjE3MzE0NTg5NzAsImp0aSI6IjV2ejZuRHk0b2kxUlp2aGsiLCJzdWIiOiIxMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nJ8_t3onm3gWvOVWHTNHV2ImI1sjIEoDiFIm6A4fFFk";

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

function renderCategory(categories) {
    categoryMenu.innerHTML = ""; 

    categories.forEach(category => {
        const categoryItem = document.createElement("li");
        categoryItem.className = "sub-menu-item";
        
        categoryItem.innerHTML = `

            <a href="category-detail.html?id=${category.CategoryId}">
                <span>${category.CategoryId + ". "}</span>
                <span>${category.CategoryName}</span>
            </a>
        `;

        categoryMenu.appendChild(categoryItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchCategory();
});
