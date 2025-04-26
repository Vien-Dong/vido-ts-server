function renderFacilities(facilities) {
    const wrapper = document.getElementById("facility-swiper-wrapper");
  
    facilities.forEach((facility) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
  
      slide.innerHTML = `
        <div class="facility-slide">
          <div class="facility-body" style="display: flex; justify-content: space-between; align-items: center;">
            <div class="facility-image">
              <img src="${facility.image}" alt="${facility}" />
            </div>
          </div>
        </div>
      `;
      wrapper.appendChild(slide);
    });
  
    new Swiper(".facility-swiper", {
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
    if (typeof Facilities !== "undefined") {
      renderFacilities(Facilities);
    } else {
      console.error("Facilities is not defined!");
    }
  });
  