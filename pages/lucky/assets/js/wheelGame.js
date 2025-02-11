$(document).ready(function () {
    var countClicked = 0;
    var clicked = false;
    var information = null;

    let value = 0; // Lưu tổng số độ quay để luôn tăng

    function spinWheel() {
        let extraSpin = 360 * 5; // Quay ít nhất 5 vòng trước khi dừng
        let probability = Math.random();
        let finalAngle;

        if (probability <= 0.9) {
            // 90% vào "Chúc bạn may mắn lần sau" (337.5° - 22.5°)
            finalAngle = Math.random() < 0.5 ? (Math.random() * 22.5) : (337.5 + Math.random() * 22.5);
        } else {
            // 10% còn lại chia đều cho các góc khác
            let otherAngles = [67.5, 112.5, 157.5, 202.5, 247.5, 292.5];
            finalAngle = otherAngles[Math.floor(Math.random() * otherAngles.length)];
        }

        value += extraSpin + finalAngle;

        $(".wheel__inner").css({
            "transition": "transform 8s cubic-bezier(0.1, 1, 0.3, 1)",
            "transform": `rotate(${value}deg)`
        });

        console.log(value % 360);

        setTimeout(() => {
            let position = value % 360;
            getPosition(position);
        }, 8000);
    }

    function getPosition(position) {
        if (position > 337.5 || position <= 22.5) {
            $('.congratulation__note').text("CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC VÉ MAY MẮN LẦN SAU");
        } else if (position > 22.5 && position <= 67.5) {
            $('.congratulation__note').text("CHÚC MỪNG BẠN NỔ HŨ");
        } else if (position > 67.5 && position <= 112.5) {
            $('.congratulation__note').text("CHÚC MỪNG BẠN TRÚNG 1 CHIẾC GĂNG TAY VÔ CỰC");
        } else if (position > 112.5 && position <= 157.5) {
            $('.congratulation__note').text("CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT ĐỐNG NỊT");
        } else if (position > 157.5 && position <= 202.5) {
            $('.congratulation__note').text("CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC APPLE WATCH");
        } else if (position > 202.5 && position <= 247.5) {
            $('.congratulation__note').text("CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT HỘP BABY THREE");
        } else if (position > 247.5 && position <= 292.5) {
            $('.congratulation__note').text("CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC LAPTOP ACER GAMING");
        } else if (position > 292.5 && position <= 337.5) {
            $('.congratulation__note').text("CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHIẾC IPHONE 16 PRO MAX");
        }

        $('.popup').removeClass('active');
        $('.congratulation').fadeIn();
        clicked = false;
        countClicked = 0;
    }
    $('.wheel__button').click(function () {
        if (clicked == true) {
            countClicked++;
        }
        else {
            spinWheel();
        }
        clicked = true;
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
