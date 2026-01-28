$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const lane = params.get("lane") || "Sheet1";

  var clicked = false;
  var isFilled = false;
  var loading = false;
  var deviceId = "";

  let formPayload = null;

  var winAudio = new Audio("./assets/voices/win.wav");

  let value = 0; // Lưu tổng số độ quay để luôn tăng

  let Training_industry = ["Kế toán", "QT kinh doanh", "QT văn phòng (Thư ký y khoa)",
    "Logistics", "QT Marketing", "Quan hệ công chúng", "Tài chính - ngân hàng", "Ô tô", "Cơ khí", "Xây dựng", "Điện - Điện Tử - Điện lạnh",
    "Thiết kế đồ họa", "Lập trình ứng dụng", "Truyền thông đa phương tiện", "Truyền thông mạng máy tính", "Dược Sĩ", "Y sĩ đa khoa", "Điều dưỡng", "Chăm sóc sắc đẹp", "Hộ sinh", "Xét nghiệm",
    "Biên phiên dịch", "Tiếng anh thương mai", "QT khách sạn", "Du lịch & lữ hành", "NV nhà hàng - khách sạn", "Sư phạm mầm non", "Giáo dục mầm non", "Tiếng anh sư phạm"
  ];

  // Lấy thẻ select
  let selectElement = document.getElementById("Training_industry");

  // Thêm các option từ mảng vào select
  Training_industry.forEach(function (Training_industry) {
    let option = document.createElement("option");
    option.value = Training_industry.toLowerCase(); // Giá trị sẽ là chữ thường (apple, banana...)
    option.textContent = Training_industry; // Hiển thị tên trái cây
    selectElement.appendChild(option); // Thêm option vào select
  });

  function spinWheel() {
    let targetAngle;

    // ✅ CHỈ rơi vào MAY MẮN LẦN SAU
    if (Math.random() < 0.5) {
      targetAngle = Math.random() * 22.5;
    } else {
      targetAngle = 337.5 + Math.random() * 22.5;
    }

    let baseRotation = (Math.floor(Math.random() * 5) + 6) * 360;
    let random = baseRotation + targetAngle;

    $(".wheel__inner").css({
      transition: "cubic-bezier(0.19,1,0.22,1) 5s",
      transform: `rotate(${random}deg)`
    });

    setTimeout(() => {
      getPosition(random % 360);
    }, 5000);
  }


  function getPosition(position) {
    const rewards = [
      { min: 0, max: 22.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC VÉ MAY MẮN LẦN SAU" },
      { min: 23.5, max: 66.5, text: "TIẾC QUÁ NHƯNG PHẦN QUÀ ĐÃ HẾT RỒI. 😢" },
      { min: 67.5, max: 111.5, text: "TIẾC QUÁ NHƯNG PHẦN QUÀ ĐÃ HẾT RỒI. 😢" },
      { min: 112.5, max: 147.5, text: "TIẾC QUÁ NHƯNG PHẦN QUÀ ĐÃ HẾT RỒI. 😢" },
      { min: 148.5, max: 201.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CUỐN TẬP" },
      { min: 202.5, max: 246.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC ÁO" },
      { min: 245.5, max: 291.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT TÚI MÙ" },
      { min: 292.5, max: 336.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC MÓC KHÓA" },
      { min: 337.5, max: 360, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC VÉ MAY MẮN LẦN SAU" },
    ];

    let rewardText = rewards.find(r => position >= r.min && position <= r.max)?.text || "";
    $('.congratulation__note').text(rewardText);

    // 🎁 CHỈ CÁC PHẦN CÓ QUÀ
    if (position >= 245.5 && position <= 336.5) {
      const code = generateRewardCode(6);

      $('.congratulation__code').html(
        `Mã nhận thưởng: <span style="color:red;font-style:italic">${code}</span>`
      );

      $('.congratulation__description').text(
        'Vui lòng đến gian hàng Cao đẳng Viễn Đông để nhận quà hoặc gửi mã này cho fanpage.'
      );

      // 🔥 OPTIONAL: nếu muốn GHI CODE VÀO PAYLOAD (KHÔNG GỬI LẠI)
      if (formPayload) {
        formPayload.reward = rewardText;
        formPayload.code = code;
      }
    } else {
      $('.congratulation__code').html('');
    }

    winAudio.play();
    $('.popup').removeClass('active');
    $('.congratulation').fadeIn();
  }


  function generateRewardCode(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  function submitToGoogleSheetAsync(payload, retry = 0) {
    fetch("https://script.google.com/macros/s/AKfycbxlQQaMbpDuRp86o347gd_SA8BfN6NwL6mi_Q6HKIQybr7F2bEsOYs3zHCh_EtJIJAqrg/exec", {
      method: "POST",
      body: new URLSearchParams(payload),
    })
      .then(res => res.text())
      .then(() => {
        console.log("✅ Saved to Google Sheet");
      })
      .catch(err => {
        console.warn("❌ Save failed", err);
        if (retry < 2) {
          setTimeout(() => submitToGoogleSheetAsync(payload, retry + 1), 1000);
        }
      });
  }

  $(document).on(
    "click",
    ".information-form button[type='submit']",
    function (event) {
      event.preventDefault();

      /* =========================
         GET INPUT
      ========================= */
      const inputNameValue = $('div[data-name="fullname"]').find("input").val();
      const inputPhoneValue = $('div[data-name="phone"]').find("input").val();
      const inputBirthdayValue = $('div[data-name="birthday"]').find("input").val();
      const inputClassValue = $('div[data-name="class"]').find("input").val();
      const inputHighschoolValue = $('div[data-name="highschool"]').find("input").val();
      const selectedIndustry = $('select[name="Training_industry"]').val();

      /* =========================
         VALIDATE
      ========================= */
      if (
        !inputNameValue ||
        !inputPhoneValue ||
        !inputBirthdayValue ||
        !inputHighschoolValue ||
        !inputClassValue
      ) {
        $("#notify").text("Vui lòng điền đầy đủ thông tin!").addClass("show");
        setTimeout(() => $("#notify").removeClass("show"), 3000);
        return;
      }

      if (inputNameValue.length < 3) {
        $("#notify").text("Vui lòng nhập đúng họ tên của bạn").addClass("show");
        setTimeout(() => $("#notify").removeClass("show"), 3000);
        return;
      }

      if (inputPhoneValue.length < 10 || inputPhoneValue.length > 11) {
        $("#notify").text("Số điện thoại không hợp lệ!").addClass("show");
        setTimeout(() => $("#notify").removeClass("show"), 3000);
        return;
      }

      /* =========================
         LOCK BUTTON
      ========================= */
      if (clicked) return;
      clicked = true;

      $(".information-form button[type='submit']")
        .prop("disabled", true)
        .find(".loader")
        .fadeIn();

      /* =========================
         CLOSE FORM (UX)
      ========================= */
      $(".information").fadeOut();

      /* =========================
         PREPARE PAYLOAD (GLOBAL)
      ========================= */
      formPayload = {
        fullname: inputNameValue,
        phone: inputPhoneValue,
        birthday: inputBirthdayValue,
        class: inputClassValue,
        highschool: inputHighschoolValue,
        industry: selectedIndustry,
        lane: typeof lane !== "undefined" ? lane : "DEFAULT",
        created_at: new Date().toISOString()
      };

      /* =========================
         SAVE GOOGLE SHEET (ASYNC)
      ========================= */
      submitToGoogleSheetAsync(formPayload);

      /* =========================
         SPIN WHEEL (NO WAIT)
      ========================= */
      setTimeout(() => {
        spinWheel();
      }, 300);
    }
  );


  $(".wheel__button").click(async function () {
    // await checkIfPlayed();
    if (!isFilled) {
      $(".information").fadeIn();
      return;
    }
    // await checkIfPlayed().then((isPlayed) => {
    //     if (isPlayed) {
    //         alert("Bạn đã chơi một lần rồi!");
    //     }
    //     else {
    //         if (!isFilled) {
    //             $('.information').fadeIn();
    //             return;
    //         }

    //         // if (!clicked) {
    //         //     spinWheel("159630", deviceId);
    //         // }
    //         // clicked = true;
    //     }
    // });
  });

  $(".congratulation__close").click(function () {
    $(".congratulation").fadeOut();
    $(".wheel__inner").css({
      transition: "none",
      transform: "rotate(0deg)",
    });
  });
  $(".congratulation").click(function (event) {
    if (event.target != this) return;
    $(this).fadeOut();
    $(".wheel__inner").css({
      transition: "none",
      transform: "rotate(0deg)",
    });
  });
  $(".information__close").click(function () {
    $(".information").fadeOut();
  });
  $(".information").click(function (event) {
    if (event.target != this) return;
    $(this).fadeOut();
  });

  $("#birthday")
    .focus(function () {
      $(this).attr("type", "date");
    })
    .blur(function () {
      let dateValue = $(this).val();
      if (dateValue) {
        let date = new Date(dateValue);
        let formattedDate =
          ("0" + date.getDate()).slice(-2) +
          "-" +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          "-" +
          date.getFullYear();
        $(this).attr("type", "text").val(formattedDate);
      } else {
        $(this).attr("type", "text");
      }
    });
});