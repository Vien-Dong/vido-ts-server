const users = [
    { name: 'Nguyễn Văn A', image: '' },
    { name: 'Nguyễn Văn B', image: '' },
    { name: 'Nguyễn Văn C', image: '' },
    { name: 'Nguyễn Văn D', image: '' },
    { name: 'Nguyễn Văn E', image: '' },
    { name: 'Nguyễn Văn F', image: '' },
    { name: 'Nguyễn Văn G', image: '' },
    { name: 'Nguyễn Văn H', image: '' },
    { name: 'Nguyễn Văn J', image: '' },
    { name: 'Nguyễn Văn K', image: '' },
    { name: 'Nguyễn Văn L', image: '' },
    { name: 'Nguyễn Văn M', image: '' },
    { name: 'Nguyễn Văn N', image: '' },
    { name: 'Nguyễn Văn O', image: '' },
    { name: 'Nguyễn Văn P', image: '' },
    { name: 'Nguyễn Văn Q', image: '' },
    { name: 'Nguyễn Văn R', image: '' },
    { name: 'Nguyễn Văn S', image: '' },
    { name: 'Nguyễn Văn Y', image: '' },
    { name: 'Nguyễn Văn U', image: '' },
    { name: 'Nguyễn Văn T', image: '' },
    { name: 'Nguyễn Văn Z', image: '' },
    { name: 'Nguyễn Văn X', image: '' },
]

$(document).ready(function () {
    const prizes = [
        { min: 91, max: 150, text: "CHÚC MỪNG {user} TRÚNG ĐƯỢC MỘT CHIẾC BALO 🎒" },
        { min: 151, max: 210, text: "CHÚC MỪNG {user} TRÚNG ĐƯỢC MỘT HỘP BABY THREE 🎁" },
        { min: 211, max: 270, text: "CHÚC MỪNG {user} TRÚNG ĐƯỢC MỘT CUỐN TẬP 📖" },
        { min: 271, max: 330, text: "CHÚC MỪNG {user} TRÚNG ĐƯỢC ÁO CDVD 👕" }
    ];

    function showWinner() {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];

        const message = randomPrize.text.replace("{user}", randomUser.name);

        $("#notify-prize").text(message).addClass("show");

        setTimeout(() => {
            $("#notify-prize").removeClass("show");
        }, 3000);
    }

    // Hiển thị mỗi 10 - 15 giây
    setInterval(() => {
        showWinner();
    }, Math.floor(Math.random() * (10000 - 5000) + 5000));
});