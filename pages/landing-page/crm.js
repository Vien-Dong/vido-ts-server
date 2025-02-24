$(document).ready(function () {
    let Training_industry = ["Kế toán", "QT kinh doanh", "QT văn phòng (Thư ký y khoa)",
        "Logistics", "QT Marketing", "Quan hệ công chúng", "Tài chính - ngân hàng", "Ô tô", "Cơ khí", "Xây dựng", "Điện - Điện Tử - Điện lạnh",
        "Thiết kế đồ họa", "Lập trình ứng dụng", "Truyền thông đa phương tiện", "Truyền thông mạng máy tính", "Dược Sĩ", "Y sĩ đa khoa", "Điều dưỡng", "Chăm sóc sắc đẹp", "Hộ sinh", "Xét nghiệm",
        "Biên phiên dịch", "Tiếng anh thương mai", "QT khách sạn", "Du lịch & lữ hành", "NV nhà hàng - khách sạn", "Sư phạm mầm non", "Giáo dục mầm non", "Tiếng anh sư phạm"
    ];

    let industrySelect = $('select[name="Training_industry"]');
    Training_industry.forEach((industry) => {
        industrySelect.append(`<option value="${industry}">${industry}</option>`);
    });

    // Bắt sự kiện khi click vào button mới
    $(document).on("click", ".btn-submit-custom", function (event) {
        event.preventDefault();

        var inputNameValue = $('input[name="name"]').val();
        var selectedIndustry = $('select[name="Training_industry"]').val();
        var inputPhoneValue = $('input[name="phone"]').val();
        var inputStreetValue = $('input[name="street"]').val();

        if (!inputNameValue || !inputPhoneValue || !inputStreetValue || !selectedIndustry) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        } else if (inputNameValue.length < 3) {
            alert("Vui lòng nhập đúng họ tên của bạn!");
            return;
        } else if (inputPhoneValue.length < 9 || inputPhoneValue.length > 12) {
            alert("Số điện thoại không hợp lệ!");
            return;
        }

        var names = inputNameValue.split(" ");
        var firstName = names[names.length - 1];
        var lastName = names.slice(0, -1).join(" ");

        var postData = {
            lastname: lastName,
            firstname: firstName,
            designation: firstName,
            salutationtype: "",
            birthday: "",
            mobile: inputPhoneValue,
            email: "",
            high_school: "",
            id_card: "",
            register_for_admission: "",
            cptarget_training_system: "",
            cptarget_source: "landing_page",
            training_industry_1: selectedIndustry,
            class: "",
            address: "",
            consulting_staff: "",
            assigned_user_id: "3",
        };

        console.log(postData);
        axios.post("/api/crm/create-cptarget", postData)
            .then((result) => {
                if (result.data && result.data.success) {
                    alert("Gửi thông tin thành công!");
                    $(".ladi-form")[0].reset();
                }
            })
            .catch((error) => {
                console.error("Lỗi gửi form:", error);
                alert("Có lỗi xảy ra, vui lòng thử lại sau.");
            });
    });
});
