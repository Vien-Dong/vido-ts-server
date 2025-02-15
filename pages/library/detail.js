// book-detail.js

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("BookId");

    if (bookId) {
        fetchBookDetail(bookId);
    } else {
        console.error("BookId không được cung cấp.");
    }
});

function fetchBookDetail(bookId) {
    axios.get(`https://api-thuvien.viendong.edu.vn/api/book/getBiblioById?BookId=${bookId}`)
        .then(response => {
            const book = response.data.data;
            renderBookDetail(book);
        })
        .catch(error => {
            console.error("Lỗi khi lấy dữ liệu chi tiết sách:", error);
        });
}

function renderBookDetail(book) {
    document.querySelector(".dc_title").innerText = book.BookName || "Không Có";
    document.querySelector(".dc_contributor").innerText = book.Authors ? book.Authors.join(", ") : "Không Có";
    document.querySelector(".dc_subject").innerText = book.Category || "Không Có";
    document.querySelector(".dc_date_issued").innerText = book.PublishYear || "Không Có";
    document.querySelector(".dc_publisher").innerText = book.PublisherName || "Không Có";
    document.querySelector(".dc_location").innerText = book.Items?.[0]?.Location || "Không Có";
    document.querySelector("#metadataFieldValue_dc_identifier_uri").innerText = `https://vido-ts-server-v1.vercel.app/detail.html?BookId=${book.BookId}`;

    const fileTable = document.querySelector("#fileTableBody");
    fileTable.innerHTML = "";

    if (book.Attachments && book.Attachments.length > 0) {
        book.Attachments.forEach(attachment => {
            console.log(book.Attachments)
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="metadataFieldValue"><a href="${book.Attachments}">${book.Attachments}</a></td>
                <td class="metadataFieldValue">Adobe PDF</td>
                <td class="metadataFieldValue"><a class="btn open-btn btn-primary">Mở</a></td>
            `;

            const readButtonByClass = row.querySelector(".open-btn");

            readButtonByClass.addEventListener("click", (event) => {
                // Gọi hàm để hiển thị PDF trong modal hoặc xử lý mở modal
                showPdf(attachment, book.BookName);
                $("#modal").modal("show");
            });

            fileTable.appendChild(row);
        });
    } else {
        fileTable.innerHTML = "<tr><td colspan='5'>Không có tệp đính kèm</td></tr>";
    }
}

function showPdf(url, name) {
    const pdfContainer = document.getElementById("frame");
    const fileName = document.getElementById("filename")

    pdfContainer.src = url;
    fileName.innerText = name;

}