const bookList = document.querySelector(".ereaders-book-grid ul");

function fetchBooks(page = 1) {
    loading.classList.remove("hidden");
    renderBooks([]);
    axios.get("https://api-thuvien.viendong.edu.vn/api/book/getBiblio", {
        params: { page: page }
    })
        .then(response => {
            const books = response.data.data;
            renderBooks(books);
            loading.classList.add("hidden");
            afterLoading.classList.remove("hidden");
        })
        .catch(error => {
            console.error("Lỗi khi lấy dữ liệu sách:", error);
            loading.classList.add("hidden");
        });
}

function renderBooks(books) {
    const container = document.getElementById("books-container");
    container.innerHTML = "";

    books.forEach(book => {
        const bookItem = document.createElement("li");
        bookItem.className = "col-md-2";

        bookItem.innerHTML = `
        <div title="${book.BookName}">
            <figure>
                <a href="book-detail.html"><img src="https://thuvien.phongmayviendong.id.vn/images/default/image.png" alt="${book.BookName}"></a>
                <figcaption>
                    <a href="#" class="icon ereaders-heart" title="Yêu thích"></a>
                    <a class="icon ereaders-reload read-btn" title="Xem" id="readButton" style="cursor: pointer;"></a>
                </figcaption>
            </figure>
            <div class="ereaders-book-grid-text overflow-hidden">
                <div class="d-flex flex-row justify-content-between">
                    <h2 class="text-truncate" title="${book.BookName}">${book.BookName}</h2>
                </div>
                <span class="text-muted">${book.Category}</span>
                <small class="mt-3 d-block text-secondary">${book.PublisherName}</small>
                ${book.Attachments && book.Attachments.length > 0 ?
                '<a class="ereaders-simple-btn ereaders-bgcolor mt-2" style="cursor: pointer;">Đọc Sách</a>'
                :
                '<a class="ereaders-simple-btn ereaders-disabled mt-2" style="cursor: pointer;">Mượn tại thư viện</a>'
                }
            </div>
        `;

        const readButtonByClass = bookItem.querySelector(".ereaders-simple-btn", ".read-btn");
        const readButtonById = bookItem.querySelector("#readButton");

        readButtonByClass.addEventListener("click", (event) => {
            // Kiểm tra nếu `Attachments` có dữ liệu
            if (!book.Attachments || book.Attachments.length === 0) {
                event.preventDefault(); // Ngăn không mở modal
                alert("Sách này không có file đính kèm để đọc, hãy mượn ở thư viện.");
            } else {
                // Gọi hàm để hiển thị PDF trong modal hoặc xử lý mở modal
                showPdf(book.Attachments[0], book.BookName);
                $("#modal").modal("show");
            }
        });

        readButtonById.addEventListener("click", (event) => {
            // Kiểm tra nếu `Attachments` có dữ liệu
            if (!book.Attachments || book.Attachments.length === 0) {
                event.preventDefault(); // Ngăn không mở modal
                alert("Sách này không có file đính kèm để đọc, hãy mượn ở thư viện.");
            } else {
                // Gọi hàm để hiển thị PDF trong modal hoặc xử lý mở modal
                showPdf(book.Attachments[0], book.BookName);
                $("#modal").modal("show");
            }
        });

        container.appendChild(bookItem);
    });
}

const loading = document.getElementById("loading");
const afterLoading = document.getElementById("after-loading");

function showPdf(url, name) {
    const pdfContainer = document.getElementById("frame");
    const fileName = document.getElementById("filename")

    pdfContainer.src = url;
    fileName.innerText = name;

}

document.getElementById("dismiss").addEventListener("click", function () {
    $("#modal").modal("hide");
});


const prevButton = document.querySelector(".previous.page-numbers");
const nextButton = document.querySelector(".next.page-numbers");
const pageLinks = document.querySelectorAll(".page-numbers");

let currentPage = 1; // Giả sử hiện tại đang ở trang 1

// Hàm cập nhật trang hiện tại
function updatePage(newPage) {
    currentPage = newPage;
    fetchBooks(currentPage); // Gọi API với trang mới
    updatePageClass(); // Cập nhật lớp CSS cho trang hiện tại
}

// Hàm cập nhật lớp CSS để làm nổi bật trang hiện tại
function updatePageClass() {
    // Xóa lớp "current" khỏi tất cả các trang
    pageLinks.forEach(pageLink => pageLink.classList.remove("current"));

    // Tìm phần tử của trang hiện tại và thêm lớp "current"
    pageLinks.forEach(pageLink => {
        if (parseInt(pageLink.textContent) === currentPage) {
            pageLink.classList.add("current");
        }
    });
}

// Gắn sự kiện click cho các nút "Previous" và "Next"
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        updatePage(currentPage - 1); // Giảm trang
    }
});

nextButton.addEventListener("click", () => {
    updatePage(currentPage + 1); // Tăng trang
});

// Gắn sự kiện click cho các liên kết trang
pageLinks.forEach(pageLink => {
    pageLink.addEventListener("click", (e) => {
        const pageNumber = parseInt(e.target.textContent);
        if (!isNaN(pageNumber)) {
            updatePage(pageNumber); // Chuyển tới trang đã chọn
        }
    });
});

// Khởi tạo trang đầu tiên khi tải trang\
document.addEventListener("DOMContentLoaded", () => {
    updatePage(currentPage);
});