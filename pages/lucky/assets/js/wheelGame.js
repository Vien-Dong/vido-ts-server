$(document).ready(function () {
    var value = 0;
    var countClicked = 0;
    var clicked = false;
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
            if (countClicked <= 2) {
                $('.popup__note').text("NGỪNG PHÁ ĐI MEN!");
            }
            else if (countClicked <= 4)
                $('.popup__note').text("LÌ QUÁ NGHEN!");
            else
                $('.popup__note').text("BÓ TAY, RÁNG PHÁ BANH NÚT NHA!");
            if (!$('.popup').hasClass('active'))
                $('.popup').addClass('active');
        }
        else {
            let random = Math.floor((Math.random() * 720) + 1440);
            value += random;
            $(".wheel__inner").css({
                "transition": "cubic-bezier(0.19, 1, 0.22, 1) 7s", // Quay lâu hơn
                "transform": `rotate(${value}deg)`
            });
            setTimeout(() => {
                //Chia lấy dư cho 360 để lấy lượng quay không hoàn thành một vòng 360deg
                getPosition(value % 360);
            }, 7000);
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
})