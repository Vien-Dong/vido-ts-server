$(document).ready(function () {
  var clicked = false;
  var isFilled = false;
  var loading = false;
  var deviceId = "";

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

  function spinWheel(record_id) {
    let random;
    let chance = Math.random(); // Xác suất từ 0 đến 1

    console.log("Chance: ", chance);
    if (chance < 0.85) {
      // 85% xác suất vào [0, 22.5] hoặc [337.5, 360]
      let targetAngle;
      if (Math.random() < 0.5) {
        targetAngle = Math.floor(Math.random() * 23.5); // Random từ 0 đến 22.5
      } else {
        targetAngle = Math.floor(Math.random() * 45) + 337.5; // Random từ 337.5 đến 360
      }

      let baseRotation = Math.floor(Math.random() * 6 + 4) * 360; // Quay 4-10 vòng
      random = baseRotation + targetAngle;
    } else {
      // 15% còn lại nhưng không bao giờ quay vào [23.5, 66.5, 112.5, 147.5]
      let targetAngle;
      do {
        targetAngle = Math.floor(Math.random() * 360); // Random một góc bất kỳ
      } while ((targetAngle >= 23.5 && targetAngle <= 246.5)); // Nếu rơi vào vùng cấm thì random lại

      let baseRotation = Math.floor(Math.random() * 6 + 4) * 360; // Quay 4-10 vòng
      random = baseRotation + targetAngle;
    }

    $(".wheel__inner").css({
      "transition": "cubic-bezier(0.19, 1, 0.22, 1) 5s",
      "transform": `rotate(${random}deg)`
    });

    setTimeout(() => {
      let position = random % 360;
      getPosition(position, record_id);
    }, 5000);
  }

  function getPosition(position, record_id) {
    const rewards = [
      { min: 0, max: 22.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC VÉ MAY MẮN LẦN SAU" },
      { min: 23.5, max: 66.5, text: "TIẾC QUÁ NHƯNG PHẦN QUÀ ĐÃ HẾT RỒI. 😢" }, // IP
      { min: 67.5, max: 111.5, text: "TIẾC QUÁ NHƯNG PHẦN QUÀ ĐÃ HẾT RỒI. 😢" }, // BALO
      { min: 112.5, max: 147.5, text: "TIẾC QUÁ NHƯNG PHẦN QUÀ ĐÃ HẾT RỒI. 😢" }, // BB3 || VOUCHER
      { min: 148.5, max: 201.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CUỐN TẬP" }, // TẬP
      { min: 202.5, max: 246.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC ÁO" }, // ÁO
      { min: 245.5, max: 291.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT TÚI MÙ" }, // TÚI MÙ
      { min: 292.5, max: 336.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC MÓC KHÓA" }, // MÓC KHÓA
      { min: 337.5, max: 360, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC VÉ MAY MẮN LẦN SAU" },
    ];

    let rewardText = rewards.find(r => position >= r.min && position <= r.max)?.text || "XUI QUÁ MỘT CHÚT NỮA LÀ TRÚNG RỒI 🤡. NẾU CÓ MÃ THÌ BẠN ĐỔI QUÀ KHÁC NHÉ.";
    $('.congratulation__note').text(rewardText);

    if ((position >= 245.5 && position <= 336.5)) {
      const code = generateRewardCode(6);
      $('.congratulation__code').html(`Mã nhận thưởng: <span style="color: red; font-style: italic;">${code}</span>`);
      $('.congratulation__description').text('Vui lòng đến gian hàng Cao đẳng Viễn Đông để nhận quà hoặc copy mã trúng thưởng này gửi fanpage Tuyển sinh Cao đẳng Viễn Đông');

      axios.put(`/api/crm/update-cptarget?record_id=${record_id}`, { winning_code: code })
        .catch(() => {
          alert('Có lỗi xảy ra, vui lòng thử lại sau.');
          window.location.reload();
        });
    }
    else {
      // axios.put('/api/check/update-id', { deviceId, isCompleted: true });
      $('.congratulation__code').html('');
    }

    winAudio.play();
    $('.popup').removeClass('active');
    $('.congratulation').fadeIn();
    // clicked = false // Reset click
  }

  function generateRewardCode(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // $(document).on('click', ".information-form button[type='submit']", function (event) {
  //   event.preventDefault();
  //   var dataName = "fullname";
  //   var inputNameValue = $('div[data-name="' + dataName + '"]').find('input').val();
  //   var dataPhone = "phone";
  //   var inputPhoneValue = $('div[data-name="' + dataPhone + '"]').find('input').val();
  //   var dataBirthday = "birthday";
  //   var inputBirthdayValue = $('div[data-name="' + dataBirthday + '"]').find('input').val();
  //   var dataHighschool = "highschool";
  //   var inputHighschoolValue = $('div[data-name="' + dataHighschool + '"]').find('input').val();

  //   if (!inputNameValue || !inputPhoneValue || !inputBirthdayValue || !inputHighschoolValue) {
  //     $("#notify").text("Vui lòng điền đầy đủ thông tin!").addClass("show");
  //     setTimeout(function () { $("#notify").removeClass("show") }, 3000);
  //     return;
  //   }

  //   else if (inputNameValue.length < 3) {
  //     $("#notify").text("Vui lòng nhập đúng họ tên của bạn").addClass("show");
  //     setTimeout(function () { $("#notify").removeClass("show") }, 3000);
  //     return;
  //   }

  //   else if (inputPhoneValue.length < 10 || inputPhoneValue.length > 11) {
  //     $("#notify").text("Số điện thoại không hợp lệ!").addClass("show");
  //     setTimeout(function () { $("#notify").removeClass("show") }, 3000);
  //     return;
  //   }

  //   loading = true;
  //   $(".information-form button[type='submit'] .loader").fadeIn();
  //   $(".information-form button[type='submit']").prop('disabled', true);

  //   var names = inputNameValue.split(' ');
  //   var firstName = names[names.length - 1];
  //   var lastName = names.slice(0, -1).join(' ');

  //   var postData = {
  //     lastname: lastName,
  //     firstname: firstName,
  //     designation: firstName,
  //     salutationtype: "",
  //     birthday: inputBirthdayValue,
  //     mobile: inputPhoneValue,
  //     email: "",
  //     high_school: inputHighschoolValue,
  //     id_card: "",
  //     register_for_admission: "",
  //     cptarget_training_system: "",
  //     cptarget_source: "lucky_wheel",
  //     training_industry_1: "",
  //     class: "",
  //     address: "",
  //     consulting_staff: "",
  //     assigned_user_id: "3",
  //   };

  //   axios.post('/api/crm/create-cptarget', postData)
  //     .then((result) => {
  //       if (result.data && result.data.success) {
  //         isFilled = true;
  //         $(".information-form button[type='submit'] .loader").fadeOut();
  //         $(".information-form button[type='submit']").prop('disabled', false);
  //         $('.information').fadeOut();
  //         if (!clicked) {
  //           setTimeout(() => spinWheel(result.data.payload?.record_id), 500);
  //         }
  //         clicked = true;
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //       $(".information-form button[type='submit'] .loader").fadeOut();
  //       $(".information-form button[type='submit']").prop('disabled', false);
  //       alert('Có lỗi xảy ra, vui lòng thử lại sau.');
  //     })
  //     .finally(() => loading = false);
  // });

  $(document).on(
    "click",
    ".information-form button[type='submit']",
    function (event) {
      event.preventDefault();
      var dataName = "fullname";
      var inputNameValue = $('div[data-name="' + dataName + '"]')
        .find("input")
        .val();
      var dataPhone = "phone";
      var inputPhoneValue = $('div[data-name="' + dataPhone + '"]')
        .find("input")
        .val();
      var dataBirthday = "birthday";
      var inputBirthdayValue = $('div[data-name="' + dataBirthday + '"]')
        .find("input")
        .val();
      var dataClass = "class";
      var inputClasslValue = $('div[data-name="' + dataClass + '"]')
        .find("input")
        .val();
      var dataHighschool = "highschool";
      var inputHighschoolValue = $('div[data-name="' + dataHighschool + '"]')
        .find("input")
        .val();
      var selectedIndustry = $('select[name="Training_industry"]').val();

      if (
        !inputNameValue ||
        !inputPhoneValue ||
        !inputBirthdayValue ||
        !inputHighschoolValue ||
        !inputClasslValue

      ) {
        $("#notify").text("Vui lòng điền đầy đủ thông tin!").addClass("show");
        setTimeout(function () {
          $("#notify").removeClass("show");
        }, 3000);
        return;
      } else if (inputNameValue.length < 3) {
        $("#notify").text("Vui lòng nhập đúng họ tên của bạn").addClass("show");
        setTimeout(function () {
          $("#notify").removeClass("show");
        }, 3000);
        return;
      } else if (inputPhoneValue.length < 10 || inputPhoneValue.length > 11) {
        $("#notify").text("Số điện thoại không hợp lệ!").addClass("show");
        setTimeout(function () {
          $("#notify").removeClass("show");
        }, 3000);
        return;
      }

      loading = true;
      $(".information-form button[type='submit'] .loader").fadeIn();
      $(".information-form button[type='submit']").prop("disabled", true);

      var names = inputNameValue.split(" ");
      var firstName = names[names.length - 1];
      var lastName = names.slice(0, -1).join(" ");

      var postData = {
        lastname: lastName,
        firstname: firstName,
        designation: firstName,
        salutationtype: "",
        birthday: inputBirthdayValue,
        mobile: inputPhoneValue,
        email: "",
        high_school: inputHighschoolValue,
        id_card: "",
        register_for_admission: "",
        cptarget_training_system: "",
        cptarget_source: "lucky_wheel",
        training_industry_1: selectedIndustry,
        class: inputClasslValue,
        address: "",
        consulting_staff: "",
        assigned_user_id: "3",
      };

      axios
        .post("/api/crm/create-cptarget", postData)
        .then((result) => {
          if (result.data && result.data.success) {
            isFilled = true;
            $(".information-form button[type='submit'] .loader").fadeOut();
            $(".information-form button[type='submit']").prop(
              "disabled",
              false
            );
            $(".information").fadeOut();
            if (!clicked) {
              setTimeout(() => spinWheel(result.data.payload?.record_id), 500);
            }
            clicked = true;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          $(".information-form button[type='submit'] .loader").fadeOut();
          $(".information-form button[type='submit']").prop("disabled", false);
          alert("Có lỗi xảy ra, vui lòng thử lại sau.");
        })
        .finally(() => (loading = false));

    }
  );

  async function getDeviceId() {
    const fp = await FingerprintJS.load({
      monitoring: false, // Tắt giám sát để giảm thay đổi ID
      excludes: {
        adBlock: true, // Bỏ qua kiểm tra AdBlock
      },
    });
    const result = await fp.get();
    return result.visitorId;
  }

  async function checkIfPlayed() {
    const $button = $(".wheel__button"); // Lấy button bằng jQuery
    $button.addClass("spinning"); // Thêm class để quay
    var isPlayed = false;

    deviceId = await getDeviceId();
    console.log("DeviceId: ", deviceId);
    await axios
      .get(`/api/check/check-id?deviceId=${deviceId}`)
      .then((result) => {
        if (result?.data && result?.data?.payload) {
          if (result?.data?.payload?.isCompleted) isPlayed = true;
        }
      })
      .finally(() => $button.removeClass("spinning")); // Dừng quay);

    return isPlayed;
  }

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