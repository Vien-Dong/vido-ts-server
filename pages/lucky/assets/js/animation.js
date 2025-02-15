$(document).ready(function () {
    const wheel = $('.wheel');
    const dotsContainer = $('.dots');
    const numDots = 12; // Số chấm sáng
    const radius = wheel.width() / 2 + 10; // Khoảng cách từ tâm đến chấm

    // Xóa các chấm cũ (nếu có)
    dotsContainer.empty();

    for (let i = 0; i < numDots; i++) {
        let angle = (i * 360 / numDots) * (Math.PI / 180); // Chia đều góc
        let x = Math.cos(angle) * radius + wheel.width() / 2.05;
        let y = Math.sin(angle) * radius + wheel.height() / 2.05;
        let delay = Math.random() * 2;

        let dot = $('<div class="dot"></div>').css({
            left: `${x}px`,
            top: `${y}px`,
            animationDelay: `${delay}s`
        });

        dotsContainer.append(dot);
    }
});

// Update vị trí khi thay đổi kích thước màn hình
$(window).resize(function () {
    $('.dots').empty();
    $(document).ready();
});