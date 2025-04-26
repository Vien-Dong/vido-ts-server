function renderSubjects(subjects) {
  const wrapper = document.getElementById("subject-swiper-wrapper");

  subjects.forEach((subject) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    slide.innerHTML = `
      <div class="subject-slide">
        <div class="subject-body" style="display: flex; justify-content: space-between; align-items: center;">
          <div class="subject-content"> 
            <div class="subject-title">${subject.name}</div>
            ${subject?.flag === false ? `` : `<div class="subject-enrollment">SỐ LƯỢNG TUYỂN SINH 2025</div>`}
            ${subject?.flag === false ? `` : `<div class="subject-quota">${subject.target}</div>`}
            <div class="subject-department">${subject?.flag == false ? `` : `Ngành ${subject.name}`}</div>
            <ul class="subject-highlights">
              ${subject?.highlights && subject?.highlights.map((h) => `<li>${h}</li>`).join("")}
              <li><a style="color: blue" href="${subject.url}" target="_blank">Bấm vào đây để xem thêm thông tin ${subject?.flag === false ? '' : `về ngành`}</a></li>
            </ul>
          </div>
          <div class="subject-image">
            <img src="${subject.image}" alt="${subject.name}" />
          </div>
        </div>
        <div style="align-self: flex-start;">
          <a class="subject-btn" href="#dang-ky" target="_blank">ĐĂNG KÝ NGAY</a>
        </div>
      </div>
    `;
    wrapper.appendChild(slide);
  });

  new Swiper(".subject-swiper", {
    loop: true,
    autoplay: {
      delay: 8000
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    spaceBetween: 30,
  });
}

// Gọi khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function () {
  if (typeof Subjects !== "undefined") {
    renderSubjects(Subjects);
  } else {
    console.error("Subjects is not defined!");
  }
});
