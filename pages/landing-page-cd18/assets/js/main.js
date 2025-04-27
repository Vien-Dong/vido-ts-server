$(document).ready(function () {
    let training_industry = ["Kế toán", "QT kinh doanh", "QT văn phòng (Thư ký y khoa)",
        "Logistics", "QT Marketing", "Quan hệ công chúng", "Tài chính - ngân hàng", "Ô tô", "Cơ khí", "Xây dựng", "Điện - Điện Tử - Điện lạnh",
        "Thiết kế đồ họa", "Lập trình ứng dụng", "Truyền thông đa phương tiện", "Truyền thông mạng máy tính", "Dược Sĩ", "Y sĩ đa khoa", "Điều dưỡng", "Chăm sóc sắc đẹp", "Hộ sinh", "Xét nghiệm",
        "Biên phiên dịch", "Tiếng anh thương mai", "QT khách sạn", "Du lịch & lữ hành", "NV nhà hàng - khách sạn", "Sư phạm mầm non", "Giáo dục mầm non", "Tiếng anh sư phạm", "Kỷ thuật chế biến món ăn"
    ];

    let training_system = [
        { label: "Đại học", value: 'university' },
        { label: "Cao đẳng", value: 'college' },
        { label: "Du học Úc", value: 'australia' },
        { label: "Du học Đức", value: 'germany' },
        { label: "Du học Mỹ", value: 'usa' },
        { label: "Học tiếp THPT", value: 'continueHighSchool' },
        { label: "Du học Nhật Bản", value: 'japan' },
        { label: "Du học Hàn Quốc", value: 'korea' },
        { label: "Đại học ĐH Kinh tế", value: 'universityUEH' },
        { label: "LĐại học Giao Thông Vận Tải", value: 'universityGSA' },
        { label: "Đại học Sư Phạm Kỹ Thuật", value: 'universitySPK' },
        { label: "Đại học Mở", value: 'universityMBS' },
        { label: "Đại học Hồng Bàng", value: 'universityHB' },
        { label: "Du học THPT + nghề Hàn Quốc", value: 'THPT_korea' },
        { label: "Du học Philippines", value: 'phi' }
    ]

    let industrySelect = $('select[name="nganhhoc"]');
    training_industry.forEach((industry) => {
        industrySelect.append(`<option value="${industry}">${industry}</option>`);
    });

    let training_systemSelect = $('select[name="hedaotao"]');
    training_system.forEach((system) => {
        training_systemSelect.append(`<option value="${system.value}">${system.label}</option>`);
    });

    const input = $('input[name="ngaysinh"]');

    input.on('focus', function () {
        // Chuyển sang type date khi focus để hiện date picker
        $(this).attr('type', 'date');
    });

    input.on('blur', function () {
        const val = $(this).val();
        if (val) {
            // Format lại ngày cho dễ đọc nếu cần
            const formatted = new Date(val).toLocaleDateString('vi-VN');
            $(this).attr('type', 'text').val(formatted);
        } else {
            // Nếu không có gì, vẫn về lại text + clear value
            $(this).attr('type', 'text').val('');
        }
    });

    // Bắt sự kiện khi click vào button mới
    $(document).on("click", "#admissionForm .wrap_btn_submit input", function (event) {
        event.preventDefault();

        var clickedButtonValue = $(this).val();

        var inputNameValue = $('input[name="hoten"]').val();
        var selectedIndustry = $('select[name="nganhhoc"]').val();
        var selectedTrainingSystem = $('select[name="hedaotao"]').val();
        var inputPhoneValue = $('input[name="sodienthoai"]').val();
        var address = $('input[name="diachi"]').val();
        var myclass = $('input[name="lop"]').val();
        var email = $('input[name="email"]').val();
        var school = $('input[name="truong"]').val();
        var birthdate = $('input[name="ngaysinh"]').val();

        if (
            !inputNameValue ||
            !inputPhoneValue ||
            !selectedIndustry ||
            !address ||
            !selectedTrainingSystem ||
            !address ||
            !myclass ||
            !school ||
            !birthdate ||
            !email
        ) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        } else if (inputNameValue.length < 3) {
            alert("Vui lòng nhập đúng họ tên của bạn!");
            return;
        } else if (inputPhoneValue.length < 9 || inputPhoneValue.length > 12) {
            alert("Số điện thoại không hợp lệ!");
            return;
        }

        const loader = $(".loader-wrapper");
        loader.addClass("show");

        var names = inputNameValue.split(" ");
        var firstName = names[names.length - 1];
        var lastName = names.slice(0, -1).join(" ");

        var note = "";
        if (clickedButtonValue === "Tôi muốn tư vấn ngay") {
            note = "Cần tư vấn";
        } else if (clickedButtonValue === "Tôi muốn xét tuyển") {
            note = "Xét tuyển";
        }

        var postData = {
            lastname: lastName,
            firstname: firstName,
            designation: firstName,
            salutationtype: "",
            birthday: birthdate,
            mobile: inputPhoneValue,
            email: email,
            high_school: school,
            id_card: "",
            register_for_admission: "",
            cptarget_training_system: selectedTrainingSystem,
            cptarget_source: "landing_page",
            training_industry_1: selectedIndustry,
            class: myclass,
            note: note,
            address: address,
            consulting_staff: "",
            assigned_user_id: "3",
            note: note
        };

        console.log(postData);

        axios.post("/api/crm/create-cptarget", postData)
            .then((result) => {
                if (result.data && result.data.success) {
                    alert("Gửi thông tin thành công!");
                    $("#admissionForm")[0].reset();
                }
                loader.removeClass("show");
            })
            .catch((error) => {
                console.error("Lỗi gửi form:", error);
                alert("Có lỗi xảy ra, vui lòng thử lại sau.");
                loader.removeClass("show");
            });
    });
});
