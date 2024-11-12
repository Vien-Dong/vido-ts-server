const bookList = document.querySelector(".ereaders-book-grid ul");

function fetchBooks(page = 1) {
    axios.get("https://api-thuvien.viendong.edu.vn/api/book/getBiblio", {
        params: { page: page }
    })
        .then(response => {
            const books = response.data.data;
            console.log("data: " + books)
            renderBooks(books);
        })
        .catch(error => {
            console.error("Lỗi khi lấy dữ liệu sách:", error);
        });
}

function renderBooks(books) {
    const container = document.getElementById("books-container");
    container.innerHTML = ""; 

    books.forEach(book => {
        const bookItem = document.createElement("li");
        bookItem.className = "col-md-2"; 

        bookItem.innerHTML = `
            <figure>
                <a href="book-detail.html"><img src="https://thuvien.phongmayviendong.id.vn/images/default/image.png" alt="${book.BookName}"></a>
                <figcaption>
                    <a href="#" class="icon ereaders-link" title="Add To Link"></a>
                    <a href="#" class="icon ereaders-heart" title="Add To Wishlist"></a>
                    <a href="#" class="icon ereaders-reload" title="Reload"></a>
                </figcaption>
            </figure>
            <div class="ereaders-book-grid-text overflow-hidden">
                <div class="d-flex flex-row justify-content-between">
                    <h2 class="text-truncate">${book.BookName}</h2>
                    <span class="text-muted">${book.Category}</span>
                </div>
                <small class="mt-3 d-block text-secondary">${book.PublisherName}</small>
                <a href="${book.Attachments[0]}" class="ereaders-simple-btn ereaders-bgcolor mt-2">Đọc Sách</a>
            </div>

        `;
        
        container.appendChild(bookItem); 
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchBooks();
});
