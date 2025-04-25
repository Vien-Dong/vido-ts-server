function renderUniversities(universities) {
    const wrapper = document.getElementById("university-swiper-wrapper");
  
    universities.forEach((university) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
  
      slide.innerHTML = `
        <div class="university-slide">
          <div class="university-body" style="display: flex; justify-content: space-between; align-items: center;">
            <div class="university-content"> 
              <div class="university-title">${university.name}</div>
              <div class="university-department">${university.target}</div>
              <div class="university-quota">${university.description}</div>
              <ul class="university-highlights">
                ${university?.highlights && university?.highlights.map((h) => `<li>${h}</li>`).join("")}
                <li><a style="color: blue" href="${university.url}" target="_blank">Bấm vào đây để xem thêm thông tin về tuyển sinh</a></li>
              </ul>
            </div>
            <div class="university-image">
              <img src="${university.image}" alt="${university.name}" />
            </div>
          </div>
        </div>
      `;
      wrapper.appendChild(slide);
    });
  
    new Swiper(".university-swiper", {
      loop: true,
      autoplay: {
        delay: 5000
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
    if (typeof Universities !== "undefined") {
      renderUniversities(Universities);
    } else {
      console.error("Universities is not defined!");
    }
  });
  