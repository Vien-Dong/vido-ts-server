$(document).ready(function () {
    var audioElement = new Audio("./assets/voices/uiaa.mp3");
    audioElement.loop = true;

    function playAudio() {
        audioElement.play().then(() => {
            console.log("Âm thanh phát thành công!");
            // Xóa sự kiện sau khi đã phát âm thanh
            $(document).off("click scroll keydown touchstart wheel mousemove", playAudio);
        }).catch(error => {
            console.error("Không thể phát âm thanh:", error);
        });
    }

    // Đợi người dùng tương tác rồi phát
    $(document).one("click scroll keydown touchstart wheel mousemove", playAudio);
});
