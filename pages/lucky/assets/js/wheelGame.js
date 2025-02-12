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
        if (chance < 0.9) {
            // 90% xác suất vào [0, 30] hoặc [331, 360]
            let targetAngle;
            if (Math.random() < 0.5) { 
                targetAngle = Math.floor(Math.random() * 31); // Random từ 0 đến 30
            } else { 
                targetAngle = Math.floor(Math.random() * 30) + 331; // Random từ 331 đến 360
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
            { min: 0, max: 30, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC VÉ MAY MẮN LẦN SAU" },
            { min: 31, max: 90, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT ĐỐNG NỊT" },
            { min: 91, max: 150, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC BALO" },
            { min: 151, max: 210, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT HỘP BABY THREE" },
            { min: 211, max: 270, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CUỐN TẬP" },
            { min: 271, max: 330, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC ÁO CDVD" },
            { min: 331, max: 360, text: "CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC VÉ MAY MẮN LẦN SAU" },
        ];

        let rewardText = rewards.find(r => position >= r.min && position <= r.max)?.text || "Không xác định";

        $('.congratulation__note').text(rewardText);

        winAudio.play();
        $('.popup').removeClass('active');
        $('.congratulation').fadeIn();
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
        if (!isFilled) {
            $('.information').fadeIn();
            return;
        }
        // $(".wheel__inner").css({
        //     "transition": "none",
        //     "transform": "rotate(0deg)"
        // });
        // setTimeout(() => spinWheel(), 500);
    })

    $('.congratulation__close').click(function () {
        $('.congratulation').fadeOut();
    })
    $('.congratulation').click(function (event) {
        if (event.target != this)
            return;
        $(this).fadeOut();
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
