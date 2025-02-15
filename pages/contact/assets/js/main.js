const careers = [
    { value: "Điều dưỡng", label: "Điều dưỡng" },
    { value: "Hộ sinh", label: "Hộ sinh" },
    { value: "Xét nghiệm", label: "Xét nghiệm" },
    { value: "Tóc, móng, trang điểm", label: "Tóc, móng, trang điểm" },
    { value: "Phun, xăm, thêu trên da", label: "Phun, xăm, thêu trên da" },
    { value: "Spa, message", label: "Spa, message" },
    { value: "Thiết kế Đồ họa", label: "Thiết kế Đồ họa" },
    { value: "Lập trình Ứng dụng", label: "Lập trình Ứng dụng" },
    { value: "Mạng máy tính", label: "Mạng máy tính" },
    { value: "QT Du lịch & Lữ hành", label: "QT Du lịch & Lữ hành" },
    { value: "Nhà hàng - Khách sạn", label: "Nhà hàng - Khách sạn" },
    { value: "Kỹ thuật Chế biến món ăn", label: "Kỹ thuật Chế biến món ăn" },
    { value: "QT Kinh doanh", label: "QT Kinh doanh" },
    { value: "QT Marketing", label: "QT Marketing" },
    { value: "QT Văn phòng", label: "QT Văn phòng" },
    { value: "Thư ký Văn phòng", label: "Thư ký Văn phòng" },
    { value: "Kế toán", label: "Kế toán" },
    { value: "Tài chính - Ngân hàng", label: "Tài chính - Ngân hàng" },
    { value: "Logistics", label: "Logistics" },
    { value: "Luật", label: "Luật" },
    { value: "Cơ khí", label: "Cơ khí" },
    { value: "Điện tử", label: "Điện tử" },
    { value: "Ô tô", label: "Ô tô" },
    { value: "Xây dựng", label: "Xây dựng" },
    { value: "Trắc địa công trình", label: "Trắc địa công trình" },
    { value: "Tiếng Anh thương mại", label: "Tiếng Anh thương mại" },
    { value: "Tiếng Anh giảng dạy", label: "Tiếng Anh giảng dạy" },
    { value: "Ngành khác", label: "Ngành khác" }
];

document.addEventListener("DOMContentLoaded", function () {
    var studentCheckbox1 = document.getElementById("student-1");
    var parentCheckbox1 = document.getElementById("parent-1");
    var studentCheckbox2 = document.getElementById("student-2");
    var parentCheckbox2 = document.getElementById("parent-2");

    studentCheckbox1.checked = false;
    parentCheckbox1.checked = false;
    studentCheckbox2.checked = false;
    parentCheckbox2.checked = false;
});

careers.forEach(career => {
    const option1 = document.createElement('option');
    option1.value = career.value;
    option1.textContent = career.label;
    document.getElementById('career-1').appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = career.value;
    option2.textContent = career.label;
    document.getElementById('career-2').appendChild(option2);
});

fetch('/api/website/crawl')
    .then(response => {
        // Kiểm tra nếu response không thành công (không thành công khi status không nằm trong khoảng 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Trả về response dưới dạng JSON
        return response.json();
    })
    .then(data => {
        if (data.status && data.payload) {
            replaceContent(data.payload);
        }
    })
    .catch(error => {
        // Xử lý lỗi nếu có
        console.error('Fetch error:', error);
    });

function replaceContent(data) {
    if (data && data.leftNew) {
        document.querySelector(".trend-top-cap").querySelector('span').textContent = data.leftNew?.tag;
        document.querySelector(".trend-top-cap").querySelector('a').textContent = data.leftNew?.title;
        document.querySelector(".trend-top-cap").querySelector('a').title = data.leftNew?.title;
        document.querySelector(".trend-top-cap").querySelector('a').href = data.leftNew?.url;
        document.querySelector(".trend-top-img").querySelector('img').src = data.leftNew?.img;
    }
    if (data && data.rightNews && data.rightNews.length > 0) {
        var containerElement = document.getElementById('trend-right-container');
        data.rightNews.forEach(function (item, index) {
            var trandRightSingleElement = document.createElement('div');
            trandRightSingleElement.classList.add('trand-right-single');
            trandRightSingleElement.classList.add('d-flex');

            var trandRightImgElement = document.createElement('div');
            trandRightImgElement.classList.add('trand-right-img');

            var imgElement = document.createElement('img');
            imgElement.src = item.img;
            imgElement.alt = '';

            var trandRightCapElement = document.createElement('div');
            trandRightCapElement.classList.add('trand-right-cap');

            var spanElement = document.createElement('span');
            spanElement.classList.add(`color${index + 1}`);
            spanElement.textContent = item.tag;

            var h4Element = document.createElement('h4');
            var aElement = document.createElement('a');
            aElement.href = item.url;
            aElement.textContent = item.title;
            aElement.title = item.title;

            h4Element.appendChild(aElement);
            trandRightCapElement.appendChild(spanElement);
            trandRightCapElement.appendChild(h4Element);
            trandRightImgElement.appendChild(imgElement);
            trandRightSingleElement.appendChild(trandRightImgElement);
            trandRightSingleElement.appendChild(trandRightCapElement);
            containerElement.appendChild(trandRightSingleElement);
        });
    }

    if (data && data.bottomNews && data.bottomNews.length > 0) {
        var container = document.getElementById('trend-bottom-container');
        data.bottomNews.forEach(function (item, index) {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6';
            col.innerHTML = `
                <div class="trend-bottom-img">
                    <img class="w-100" src="${item.img}" alt="">
                    <div class="trend-bottom-cap">
                    <h6 class="link-container">
                        <a href="${item.url}" title="${item.title}">${item.title}</a>
                    </h6>
                    </div>
                </div>
                `;
            container.appendChild(col);
        });
    }
}

$(document).ready(function ($) {
    "use strict"; var loader = function () { setTimeout(function () { if ($('#pb_loader').length > 0) { $('#pb_loader').removeClass('show'); } }, 700); }; loader(); var scrollWindow = function () {
        $(window).scroll(function () {
            var $w = $(this), st = $w.scrollTop(), navbar = $('.pb_navbar'), sd = $('.js-scroll-wrap'); if (st > 150) { if (!navbar.hasClass('scrolled')) { navbar.addClass('scrolled'); } }
            if (st < 150) { if (navbar.hasClass('scrolled')) { navbar.removeClass('scrolled sleep'); } }
            if (st > 350) {
                if (!navbar.hasClass('awake')) { navbar.addClass('awake'); }
                if (sd.length > 0) { sd.addClass('sleep'); }
            }
            if (st < 350) {
                if (navbar.hasClass('awake')) { navbar.removeClass('awake'); navbar.addClass('sleep'); }
                if (sd.length > 0) { sd.removeClass('sleep'); }
            }
        });
    }; scrollWindow(); var slickSliders = function () { $('.single-item').slick({ slidesToShow: 1, slidesToScroll: 1, dots: true, infinite: true, autoplay: false, autoplaySpeed: 2000, nextArrow: '<span class="next"><i class="ion-ios-arrow-right"></i></span>', prevArrow: '<span class="prev"><i class="ion-ios-arrow-left"></i></span>', arrows: true, draggable: false, adaptiveHeight: true }); $('.single-item-no-arrow').slick({ slidesToShow: 1, slidesToScroll: 1, dots: true, infinite: true, autoplay: true, autoplaySpeed: 2000, nextArrow: '<span class="next"><i class="ion-ios-arrow-right"></i></span>', prevArrow: '<span class="prev"><i class="ion-ios-arrow-left"></i></span>', arrows: false, draggable: false }); $('.multiple-items').slick({ slidesToShow: 3, slidesToScroll: 1, dots: true, infinite: true, autoplay: true, autoplaySpeed: 2000, arrows: true, nextArrow: '<span class="next"><i class="ion-ios-arrow-right"></i></span>', prevArrow: '<span class="prev"><i class="ion-ios-arrow-left"></i></span>', draggable: false, responsive: [{ breakpoint: 1125, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true, dots: true } }, { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 2 } }, { breakpoint: 580, settings: { slidesToShow: 1, slidesToScroll: 1 } }] }); $('.js-pb_slider_content').slick({ slidesToShow: 1, slidesToScroll: 1, arrows: false, fade: true, asNavFor: '.js-pb_slider_nav', adaptiveHeight: false }); $('.js-pb_slider_nav').slick({ slidesToShow: 3, slidesToScroll: 1, asNavFor: '.js-pb_slider_content', dots: false, centerMode: true, centerPadding: "0px", focusOnSelect: true, arrows: false }); $('.js-pb_slider_content2').slick({ slidesToShow: 1, slidesToScroll: 1, arrows: false, fade: true, asNavFor: '.js-pb_slider_nav2', adaptiveHeight: false }); $('.js-pb_slider_nav2').slick({ slidesToShow: 3, slidesToScroll: 1, asNavFor: '.js-pb_slider_content2', dots: false, centerMode: true, centerPadding: "0px", focusOnSelect: true, arrows: false }); }; slickSliders(); var OnePageNav = function () { var navToggler = $('.navbar-toggler'); $(".smoothscroll[href^='#'], #probootstrap-navbar ul li a[href^='#']").on('click', function (e) { e.preventDefault(); var hash = this.hash; $('html, body').animate({ scrollTop: $(hash).offset().top }, 700, 'easeInOutExpo', function () { window.location.hash = hash; }); }); $("#probootstrap-navbar ul li a[href^='#']").on('click', function (e) { if (navToggler.is(':visible')) { navToggler.click(); } }); $('body').on('activate.bs.scrollspy', function () { console.log('nice'); }) }; OnePageNav(); var offCanvasNav = function () {
        var toggleNav = $('.js-pb_nav-toggle'), offcanvasNav = $('.js-pb_offcanvas-nav_v1'); if (toggleNav.length > 0) { toggleNav.click(function (e) { $(this).toggleClass('active'); offcanvasNav.addClass('active'); e.preventDefault(); }); }
        offcanvasNav.click(function (e) {
            if (offcanvasNav.hasClass('active')) { offcanvasNav.removeClass('active'); toggleNav.removeClass('active'); }
            e.preventDefault();
        })
    }; offCanvasNav(); var ytpPlayer = function () { if ($('.ytp_player').length > 0) { $('.ytp_player').mb_YTPlayer(); } }
    ytpPlayer();
});

const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});
const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if (carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}
const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}
const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

var studentCheckbox1 = document.getElementById("student-1");
var parentCheckbox1 = document.getElementById("parent-1");
var studentCheckbox2 = document.getElementById("student-2");
var parentCheckbox2 = document.getElementById("parent-2");

studentCheckbox1.addEventListener("click", (e) => {
    if (parentCheckbox1.checked) {
        parentCheckbox1.checked = false; // Uncheck parent checkbox
    }
});

parentCheckbox1.addEventListener("click", (e) => {
    if (studentCheckbox1.checked) {
        studentCheckbox1.checked = false; // Uncheck student checkbox
    }
});

studentCheckbox2.addEventListener("click", (e) => {
    if (parentCheckbox2.checked) {
        parentCheckbox2.checked = false; // Uncheck parent checkbox
    }
});

parentCheckbox2.addEventListener("click", (e) => {
    if (studentCheckbox2.checked) {
        studentCheckbox2.checked = false; // Uncheck student checkbox
    }
});

document.getElementById("form-1").addEventListener("submit", async (e) => {
    e.preventDefault();
    var fullname = document.getElementById("fullname-1").value;
    var phone = document.getElementById("phone-1").value;
    var birthday = document.getElementById("birthday-1").value;
    var career = document.getElementById("career-1").value;
    var content = document.getElementById("content-1").value;
    var nameParts = fullname.split(" ");
    const body = {
        data: {
            lastname: nameParts.slice(0, -1).join(" "),
            firstname: nameParts.slice(-1)[0],
            mobile: phone,
            birthday: moment(birthday).format("DD-MM-YYYY"),
            training_industry_1: career,
            consulting_content: content,
            cptarget_consulting_content: studentCheckbox1.checked ? "student" : parentCheckbox1.checked ? "parent" : null,
            cptarget_source: "website",
            date_added: moment(new Date()).format("YYYY/MM/DD"),
            assigned_user_id: "Users:52"
        }
    }

    await axios.get("https://crm.viendong.edu.vn/api/OpenAPI/auth", {
        params: {
            "username": "giaotran",
            "access_key_md5": "969677b1d7f282346b93c81b26e421f1"
        }
    }).then(async (res) => {
        await axios.post("https://crm.viendong.edu.vn/api/OpenAPI/create?module=CPTarget", body, {
            headers: {
                "Access-Token": res.data?.access_token
            }
        }).then(() => {
            alert("Đăng ký tư vấn thành công!");
            setTimeout(() => window.location.reload(), 500);
        }).catch((error) => console.log("Post CRM: ", error));
    }).catch((error) => console.log("Get CRM: ", error));
})

document.getElementById("form-2").addEventListener("submit", async (e) => {
    e.preventDefault();
    var fullname = document.getElementById("fullname-2").value;
    var phone = document.getElementById("phone-2").value;
    var birthday = document.getElementById("birthday-2").value;
    var career = document.getElementById("career-2").value;
    var content = document.getElementById("content-2").value;
    var nameParts = fullname.split(" ");
    const body = {
        data: {
            lastname: nameParts.slice(0, -1).join(" "),
            firstname: nameParts.slice(-1)[0],
            mobile: phone,
            birthday: moment(birthday).format("DD-MM-YYYY"),
            training_industry_1: career,
            consulting_content: content,
            cptarget_consulting_content: studentCheckbox2.checked ? "student" : parentCheckbox2.checked ? "parent" : null,
            cptarget_source: "website",
            date_added: moment(new Date()).format("YYYY/MM/DD"),
            assigned_user_id: "Users:52"
        }
    }

    await axios.get("https://crm.viendong.edu.vn/api/OpenAPI/auth", {
        params: {
            "username": "giaotran",
            "access_key_md5": "969677b1d7f282346b93c81b26e421f1"
        }
    }).then(async (res) => {
        await axios.post("https://crm.viendong.edu.vn/api/OpenAPI/create?module=CPTarget", body, {
            headers: {
                "Access-Token": res.data?.access_token
            }
        }).then(() => {
            alert("Đăng ký tư vấn thành công!");
            setTimeout(() => window.location.reload(), 500);
        }).catch((error) => console.log("Post CRM: ", error));
    }).catch((error) => console.log("Get CRM: ", error));
})
