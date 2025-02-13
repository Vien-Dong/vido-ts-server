$(document).ready(function () {
    var clicked = false;
    var isFilled = false;
    var loading = false;

    var winAudio = new Audio("./assets/voices/win.wav");

    let value = 0; // Lưu tổng số độ quay để luôn tăng

    function spinWheel() {
        let random;
        let chance = Math.random(); // Xác suất từ 0 đến 1

        console.log(chance);
        if (chance < 0.8) {
            // 80% xác suất vào [0, 22.5] hoặc [337.5, 360]
            let targetAngle;
            if (Math.random() < 0.5) {
                targetAngle = Math.floor(Math.random() * 23.5); // Random từ 0 đến 22.5
            } else {
                targetAngle = Math.floor(Math.random() * 45) + 337.5; // Random từ 337.5 đến 360
            }

            let baseRotation = Math.floor(Math.random() * 6 + 4) * 360; // Quay 4-10 vòng
            random = baseRotation + targetAngle;
        } else {
            // 10% xác suất quay vào góc bất kỳ
            random = Math.floor((Math.random() * 6 + 4) * 360) + Math.floor(Math.random() * 360);
        }

        $(".wheel__inner").css({
            "transition": "cubic-bezier(0.19, 1, 0.22, 1) 5s",
            "transform": `rotate(${random}deg)`
        });

        setTimeout(() => {
            let position = random % 360;
            getPosition(position);
        }, 5000);
    }

    function getPosition(position) {
        const rewards = [
            { min: 0, max: 22.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC VÉ MAY MẮN LẦN SAU" },
            { min: 23.5, max: 66.5, text: "CÓ CÁI NỊT :V" },
            { min: 67.5, max: 111.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC BALO" },
            { min: 112.5, max: 147.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT HỘP BABY THREE" },
            { min: 148.5, max: 201.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CUỐN TẬP" },
            { min: 202.5, max: 246.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC ÁO CDVD" },
            { min: 245.5, max: 291.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT TÚI MÙ" },
            { min: 292.5, max: 336.5, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC MÓC KHÓA" },
            { min: 337.5, max: 360, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC VÉ MAY MẮN LẦN SAU" },
        ];

        let rewardText = rewards.find(r => position >= r.min && position <= r.max)?.text || "Không xác định";
        $('.congratulation__note').text(rewardText);

        if (position >= 67.5 && position <= 336.5)
            $('.congratulation__code').html(`Mã nhận thưởng: <span style="color: red; font-style: italic;">${generateRewardCode(6)}</span>`);
        else 
            $('.congratulation__code').html('');

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

    $(document).on('click', ".information-form button[type='submit']", function (event) {
        event.preventDefault();
        var dataName = "fullname";
        var inputNameValue = $('div[data-name="' + dataName + '"]').find('input').val();
        var dataPhone = "phone";
        var inputPhoneValue = $('div[data-name="' + dataPhone + '"]').find('input').val();

        if (!inputNameValue || !inputPhoneValue) {
            $("#notify").text("Vui lòng điền đầy đủ thông tin!").addClass("show");
            setTimeout(function () { $("#notify").removeClass("show") }, 3000);
            return;
        }

        else if (inputPhoneValue.length < 10 || inputPhoneValue.length > 11) {
            $("#notify").text("Số điện thoại không hợp lệ!").addClass("show");
            setTimeout(function () { $("#notify").removeClass("show") }, 3000);
            return;
        }

        loading = true;
        var names = inputNameValue.split(' ');
        var firstName = names[names.length - 1];
        var lastName = names.slice(0, -1).join(' ');

        var postData = {
            lastname: lastName,
            firstname: firstName,
            designation: firstName,
            salutationtype: "",
            birthday: "11-07-2004",
            mobile: inputPhoneValue,
            email: "",
            high_school: "",
            id_card: "",
            register_for_admission: "",
            cptarget_training_system: "",
            cptarget_source: "website",
            training_industry_1: "",
            class: "",
            address: "",
            consulting_staff: "",
            assigned_user_id: "3",
        };

        axios.post('/api/crm/create-cptarget', postData)
            .then(() => {
                isFilled = true;
                $('.information').fadeOut();
                if (!clicked) {
                    setTimeout(spinWheel, 500);
                }
                clicked = true;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra, vui lòng thử lại sau.');
            })
            .finally(() => loading = false);
    });

    $('.wheel__button').click(function () {
        // if (!isFilled) {
        //     $('.information').fadeIn();
        //     return;
        // }

        spinWheel();
    })

    $('.congratulation__close').click(function () {
        $('.congratulation').fadeOut();
        $(".wheel__inner").css({
            "transition": "none",
            "transform": "rotate(0deg)"
        });
    })
    $('.congratulation').click(function (event) {
        if (event.target != this)
            return;
        $(this).fadeOut();
        $(".wheel__inner").css({
            "transition": "none",
            "transform": "rotate(0deg)"
        });
    })
    $('.information__close').click(function () {
        $('.information').fadeOut();
    })
    $('.information').click(function (event) {
        if (event.target != this)
            return;
        $(this).fadeOut();
    })
})
