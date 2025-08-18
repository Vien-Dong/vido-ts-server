$(document).ready(function () {
    let Training_industry = ["Kế toán", "QT kinh doanh", "QT văn phòng (Thư ký y khoa)",
        "Logistics", "QT Marketing", "Quan hệ công chúng", "Tài chính - ngân hàng", "Ô tô", "Cơ khí", "Xây dựng", "Điện - Điện Tử - Điện lạnh",
        "Thiết kế đồ họa", "Lập trình ứng dụng", "Truyền thông đa phương tiện", "Truyền thông mạng máy tính", "Dược Sĩ", "Y sĩ đa khoa", "Điều dưỡng", "Chăm sóc sắc đẹp", "Hộ sinh", "Xét nghiệm",
        "Biên phiên dịch", "Tiếng anh thương mai", "QT khách sạn", "Du lịch & lữ hành", "NV nhà hàng - khách sạn", "Sư phạm mầm non", "Giáo dục mầm non", "Tiếng anh sư phạm"
    ];

    let training_system = [
        { label: "Đại học", value: 'university' },
        { label: "Cao đẳng", value: 'college' },
        { label: "Trung cấp nghề", value: 'vocational' },
        { label: "Chương trình ngắn hạn", value: 'shortTermVocational' },
        { label: "Du học Úc", value: 'australia' },
        { label: "Du học Đức", value: 'germany' },
        { label: "Du học Mỹ", value: 'usa' },
        { label: "Xuất khẩu lao động", value: 'laborExport' },
        { label: "Học tiếp THPT", value: 'continueHighSchool' },
        { label: "Du học Nhật Bản", value: 'japan' },
        { label: "Du học Hàn Quốc", value: 'korea' },
        { label: "Học song song văn hóa và nghề", value: 'culturalParallelism' },
        { label: "Liên thông", value: 'universityTransfer' },
        { label: "Đại học ĐH Kinh tế", value: 'universityUEH' },
        { label: "LĐại học Giao Thông Vận Tải", value: 'universityGSA' },
        { label: "Đại học Sư Phạm Kỹ Thuật", value: 'universitySPK' },
        { label: "Đại học Mở", value: 'universityMBS' },
        { label: "Đại học Hồng Bàng", value: 'universityHB' },
        { label: "Cao đẳng 9+3+1 (tốt nghiệp THCS)", value: 'college9_3_1' },
        { label: "Du học THPT + nghề Hàn Quốc", value: 'THPT_korea' },
        { label: "Du học Philippines", value: 'phi' }
    ]

    let industrySelect = $('select[name="Training_industry"]');
    Training_industry.forEach((industry) => {
        industrySelect.append(`<option value="${industry}">${industry}</option>`);
    });

    let training_systemSelect = $('select[name="training_system"]');
    training_system.forEach((system) => {
        training_systemSelect.append(`<option value="${system.value}">${system.label}</option>`);
    });

    const input = $('input[name="birthdate"]');

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
    $(document).on("click", ".btn-submit-custom", function (event) {
        event.preventDefault();

        var inputNameValue = $('input[name="name"]').val();
        var selectedIndustry = $('select[name="Training_industry"]').val();
        var selectedTrainingSystem = $('select[name="training_system"]').val();
        var inputPhoneValue = $('input[name="phone"]').val();
        var address = $('input[name="address"]').val();
        var myclass = $('input[name="class"]').val();
        var school = $('input[name="school"]').val();
        var birthdate = $('input[name="birthdate"]').val();

        if (
            !inputNameValue ||
            !inputPhoneValue ||
            !selectedIndustry ||
            !address ||
            !selectedTrainingSystem ||
            !address ||
            !myclass ||
            !school ||
            !birthdate
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

        const button = $(this);
        const loader = button.find(".loader");
        button.css("pointer-events", "none");
        button.css("opacity", "0.6"); // cho mờ đi

        // Show loader + disable button
        loader.show();

        var names = inputNameValue.split(" ");
        var firstName = names[names.length - 1];
        var lastName = names.slice(0, -1).join(" ");

        var postData = {
            lastname: lastName,
            firstname: firstName,
            full_name: inputNameValue,
            designation: firstName,
            salutationtype: "",
            birthday: birthdate,
            mobile: inputPhoneValue,
            email: "",
            high_school: school,
            id_card: "",
            register_for_admission: "",
            cptarget_training_system: selectedTrainingSystem,
            cptarget_source: "landing_page",
            training_industry_1: selectedIndustry,
            class: myclass,
            address: address,
            consulting_staff: "",
            assigned_user_id: "3",
        };

        axios.post("/api/crm/create-cptarget", postData)
            .then((result) => {
                if (result.data && result.data.success) {
                    alert("Gửi thông tin thành công!");
                    $(".ladi-form")[0].reset();
                }
                loader.hide();
                button.css("pointer-events", "auto");
                button.css("opacity", "1");
            })
            .catch((error) => {
                console.error("Lỗi gửi form:", error);
                alert("Có lỗi xảy ra, vui lòng thử lại sau.");
                loader.hide();
                button.css("pointer-events", "auto");
                button.css("opacity", "1");
            });
    });
});
