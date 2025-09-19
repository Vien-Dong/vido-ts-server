// Global variables
let currentWeekStart = new Date();
let selectedDate = new Date();
let currentSubject = null;
let students = [];
let attendance = {};
let qrData = null;
let attendanceData = [];

// Sample data - Replace with actual API calls
const sampleSubjects = {
    "2025-07-28": [
        {
            id: "sub1",
            name: "Web Development",
            time: "08:00 - 10:00",
            room: "Room A101",
            code: "WEB101",
        },
        {
            id: "sub2",
            name: "Database Management",
            time: "10:15 - 12:15",
            room: "Room B203",
            code: "DB201",
        },
    ],
    "2025-07-29": [
        {
            id: "sub3",
            name: "Mobile App Development",
            time: "14:00 - 16:00",
            room: "Room C105",
            code: "MOB301",
        },
    ],
};

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    document
        .getElementById("menuToggle")
        .addEventListener("click", function () {
            document.getElementById("sidebar").classList.toggle("open");
        });

    // Check if user is already logged in
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        showDashboard();
    } else {
        showLoginPage();
    }

    // Login form handler
    document
        .getElementById("loginForm")
        .addEventListener("submit", handleLogin);

    // QR Modal close on outside click
    document.getElementById('qrModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeQRModal();
        }
    });

    // Initialize current week
    setCurrentWeekStart();
    generateDayButtons();
    selectToday();
});

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const btn = document.getElementById("login-btn");

    // Simulate API call - Replace with actual authentication
    if (username && password) {
        btn.querySelector(".fa-right-to-bracket").style.display = "none";
        btn.querySelector(".fa-spinner").style.display = "inline-block";
        btn.disabled = true;

        try {
            const response = await axios.post("/api/school/login", {
                userid: username,
                pass: password,
                type: "local",
            });
            const result = response.data;
            if (result.success) {
                localStorage.setItem("accessToken", result.token);
                localStorage.setItem("userInfo", JSON.stringify(result.user));
                showDashboard();
            } else {
                showToast("Lỗi đăng nhập! Vui lòng thử lại", "error");
            }
        } catch (err) {
            showToast("Có lỗi xảy ra, vui lòng thử lại sau.", "error");
        } finally {
            btn.querySelector(".fa-right-to-bracket").style.display =
                "inline-block";
            btn.querySelector(".fa-spinner").style.display = "none";
            btn.disabled = false;
        }
    } else {
        alert("Vui lòng nhập tên đăng nhập hoặc mật khẩu");
    }
}

function showLoginPage() {
    document.getElementById("loginPage").style.display = "flex";
    document.getElementById("dashboard").style.display = "none";
}

function showDashboard() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    setTimeout(() => {
        generateDayButtons();
        selectToday();
        loadSubjectsForDate(selectedDate);
    }, 500);
}

function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    showLoginPage();
    document.getElementById("loginForm").reset();
}

function setCurrentWeekStart() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() + mondayOffset);
}

function generateDayButtons() {
    const dayButtons = document.getElementById("dayButtons");
    const dayNames = [
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
        "Chủ nhật",
    ];

    dayButtons.innerHTML = "";

    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);

        const button = document.createElement("button");
        button.className = "day-btn";
        button.innerHTML = `
            <div>${dayNames[i]}</div>
            <div style="font-size: 0.625rem; margin-top: 2px;">${date.getDate()}/${date.getMonth() + 1
            }</div>
          `;
        button.onclick = () => selectDay(date, button);
        dayButtons.appendChild(button);
    }
}

function selectDay(date, button) {
    backToSubjects();
    document
        .querySelectorAll(".day-btn")
        .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    selectedDate = new Date(date);
    loadSubjectsForDate(selectedDate);
}

function selectToday() {
    const today = new Date();
    const dayButtons = document.querySelectorAll(".day-btn");

    for (let i = 0; i < dayButtons.length; i++) {
        const buttonDate = new Date(currentWeekStart);
        buttonDate.setDate(currentWeekStart.getDate() + i);

        if (buttonDate.toDateString() === today.toDateString()) {
            dayButtons[i].click();
            return;
        }
    }

    if (dayButtons.length > 0) {
        dayButtons[0].click();
    }
}

function changeWeek(direction) {
    currentWeekStart.setDate(currentWeekStart.getDate() + direction * 7);
    generateDayButtons();

    const dayOfWeek = selectedDate.getDay();
    const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const newSelectedDate = new Date(currentWeekStart);
    newSelectedDate.setDate(currentWeekStart.getDate() + mondayOffset);

    const dayButtons = document.querySelectorAll(".day-btn");
    if (dayButtons[mondayOffset]) {
        dayButtons[mondayOffset].click();
    } else {
        dayButtons[0].click();
    }
}

function loadSubjectsForDate(date) {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    const container = document.getElementById("subjectsContainer");
    container.innerHTML =
        '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Đang tải môn học...</div>';

    setTimeout(async () => {
        const dateKey = date.toISOString().split("T")[0];

        try {
            const response = await axios.get("/api/school/tkb", {
                params: { ngay: dateKey },
                headers: {
                    'token': localStorage.getItem('accessToken')
                }
            });

            const result = response.data;
            if (result.success) {
                const subjects = result.data;

                if (subjects.length === 0) {
                    container.innerHTML = `
              <div class="no-subjects">
                <i class="fas fa-calendar-times"></i>
                <h3>Không có lịch</h3>
                <p>Không tìm thấy lớp cho ngày ${date.toLocaleDateString(
                        "vi-VN"
                    )}</p>
              </div>
            `;
                    return;
                }

                container.innerHTML = `
            <div class="subjects-grid">
              ${subjects
                        .map(
                            (subject) => `
                        <div class="subject-card" onclick="openStudentList('${encodeURIComponent(
                                JSON.stringify(subject)
                            )}')">
                            <div class="subject-title">
                                <span class="subject-tag ${subject.buoi === "S"
                                    ? "tag-sang"
                                    : "tag-chieu"
                                }">
                                    ${subject.buoi === "S" ? "Sáng" : "Chiều"}
                                </span>
                                ${subject.mhten}
                            </div>
                            <div class="subject-meta">
                                <span><i class="fas fa-clock"></i> ${subject.thoigianbd
                                }</span>
                                <span><i class="fas fa-door-open"></i> ${subject.phongten
                                }</span>
                            </div>
                        </div>
                    `
                        )
                        .join("")}
            </div>
          `;
            } else {
                container.innerHTML = `
              <div class="no-subjects">
                <i class="fas fa-calendar-times"></i>
                <h3>Không có lịch</h3>
                <p>Không tìm thấy lớp cho ngày ${date.toLocaleDateString(
                    "vi-VN"
                )}</p>
              </div>
            `;
            }
        } catch (err) {
            showToast("Có lỗi xảy ra, vui lòng thử lại sau!", "error");
        }
    }, 500);
}

async function reloadStudentList() {
    const btn = document.getElementById("reload-btn");

    // Check if we have a current subject selected
    if (!currentSubject) {
        showToast("Không có lớp nào được chọn", "error");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Đang tải...`;

    try {
        // Reload the student list for the current subject
        const token = localStorage.getItem("accessToken");

        if (!token) {
            showToast("Phiên đăng nhập hết hạn", "error");
            return;
        }

        const response = await axios.post(
            `/api/school/studentList`,
            currentSubject,
            {
                headers: {
                    'token': token
                }
            }
        );

        const result = response.data;

        if (result.success) {
            students = result.data;
            attendance = {};

            // Reset attendance status based on fresh data
            students.forEach((student) => {
                attendance[student.hocvienid] = student.hiendienyn;
            });

            renderStudentList();
            updateStats();
            showToast("Đã tải lại danh sách sinh viên", "success");
        } else {
            showToast("Lỗi tải danh sách sinh viên, vui lòng thử lại", "error");
        }
    } catch (err) {
        console.error("Reload error:", err);
        showToast("Có lỗi xảy ra khi tải lại danh sách", "error");
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-rotate-right"></i> Tải lại`;
    }
    clearFilter();
}

async function openStudentList(subject) {
    clearFilter();
    const spinner = document.getElementById("loadingSpinner");
    spinner.style.display = "block";
    document.getElementById("studentListView").style.display = "none";
    currentSubject = JSON.parse(decodeURIComponent(subject));
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
        const response = await axios.post(
            `/api/school/studentList`,
            currentSubject,
            {
                headers: {
                    'token': localStorage.getItem("accessToken")
                }
            }
        );

        const result = response.data;
        console.log("Student list response:", result);
            if (result.success) {
            students = result.data;
            attendance = {};

            students.forEach((student) => {
                attendance[student.hocvienid] = student.hiendienyn;
            });

            document.getElementById("subjectsView").style.display = "none";
            document.getElementById("studentListView").style.display = "block";
            document.getElementById("subjectTitle").textContent =
                currentSubject.mhten;

            renderStudentList();
            updateStats();
        } else {
            showToast("Lỗi tải danh sách sinh viên, vui lòng thử lại", "error");
        }
    } catch (err) {
        showToast("Có lỗi xảy ra, vui lòng thử lại sau!", "error");
    } finally {
        spinner.style.display = "none";
    }
}

function renderStudentList() {
    const studentList = document.getElementById("studentList");

    const sortedStudents = [...students].sort((a, b) => {
        // chuẩn hóa bỏ dấu, viết thường
        const nameA = a.ten.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const nameB = b.ten.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        // so sánh tên riêng từng ký tự
        if (nameA !== nameB) {
            for (let i = 0; i < Math.min(nameA.length, nameB.length); i++) {
                if (nameA[i] !== nameB[i]) {
                    return nameA.charCodeAt(i) - nameB.charCodeAt(i);
                }
            }
            return nameA.length - nameB.length; // nếu một tên là prefix của tên kia
        }

        // Nếu tên giống hệt nhau thì so tiếp cả họ + đệm
        const fullA = `${a.ho} ${a.ten}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const fullB = `${b.ho} ${b.ten}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return fullA.localeCompare(fullB, "vi");
    });

    studentList.innerHTML = sortedStudents
        .map(
            (student) => `
          <div class="student-item ${attendance[student.hocvienid] ? "present" : ""}"
               onclick="toggleAttendance('${student.hocvienid}')">
            <div class="student-info">
              <h4>${student.ho} ${student.ten}</h4>
              <p>MSSV: ${student.mshv}</p>
            </div>
            <div class="attendance-status ${attendance[student.hocvienid] ? "status-present" : "status-absent"}">
              ${attendance[student.hocvienid] ? "Hiện diện" : "Vắng"}
            </div>
          </div>
        `
        )
        .join("");
}

function filterStudents() {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    const studentItems = document.querySelectorAll("#studentList .student-item");

    studentItems.forEach(item => {
        const name = item.querySelector(".student-info h4").textContent.toLowerCase();
        const mssv = item.querySelector(".student-info p").textContent.toLowerCase();
        
        if (name.includes(input) || mssv.includes(input)) {
            item.style.display = "flex"; // hiện lại
        } else {
            item.style.display = "none"; // ẩn đi
        }
    });
}

function clearFilter() {
    const input = document.getElementById("searchInput");
    input.value = ""; 
}


function toggleAttendance(studentId) {
    // cập nhật trạng thái trong attendance
    attendance[studentId] = !attendance[studentId];

    // tìm đúng element student trong DOM
    const studentItem = document.querySelector(`#studentList .student-item[onclick="toggleAttendance('${studentId}')"]`);
    if (studentItem) {
        // update class
        if (attendance[studentId]) {
            studentItem.classList.add("present");
        } else {
            studentItem.classList.remove("present");
        }

        // update text trạng thái
        const statusDiv = studentItem.querySelector(".attendance-status");
        if (statusDiv) {
            statusDiv.className = `attendance-status ${attendance[studentId] ? "status-present" : "status-absent"}`;
            statusDiv.textContent = attendance[studentId] ? "Hiện diện" : "Vắng";
        }
    }

    // chỉ gọi updateStats, không reload lại toàn bộ danh sách
    updateStats();
}


function updateStats() {
    const total = students.length;
    const present = Object.values(attendance).filter(
        (status) => status
    ).length;
    const absent = total - present;

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("presentCount").textContent = present;
    document.getElementById("absentCount").textContent = absent;
}

function selectAllStudents() {
    students.forEach((student) => {
        attendance[student.hocvienid] = true;
    });
    renderStudentList();
    updateStats();
}

function removeAllStudents() {
    students.forEach((student) => {
        attendance[student.hocvienid] = false;
    });
    renderStudentList();
    updateStats();
}

function backToSubjects() {
    document.getElementById("studentListView").style.display = "none";
    document.getElementById("subjectsView").style.display = "block";
}

async function saveAttendance() {
    if (!currentSubject) return;
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    const btn = document.getElementById("save-btn");
    btn.querySelector(".fa-floppy-disk").style.display = "none";
    btn.querySelector(".fa-spinner").style.display = "inline-block";
    btn.disabled = true;

    try {
        const attendanceData = {
            tkb: {
                tkbid: currentSubject.tkbid,
                lopid: currentSubject.lopid,
                gvid: currentSubject.gvid,
                phongid: currentSubject.phongid,
                ngayid: currentSubject.ngayid,
                ngay: currentSubject.ngay,
                thoigianbd: currentSubject.thoigianbd,
                thoigiankt: currentSubject.thoigiankt,
                dkid: currentSubject.dkid,
                baonghiyn: currentSubject.baonghiyn,
                dkghichu: currentSubject.dkghichu,
                buoi: currentSubject.buoi,
                loaitkb: currentSubject.loaitkb,
                lmhid: currentSubject.lmhid,
                lmhma: currentSubject.lmhma,
                mhma: currentSubject.mhma,
                mhten: currentSubject.mhten,
                phongma: currentSubject.phongma,
                phongten: currentSubject.phongten,
                phongghichu: currentSubject.phongghichu,
            },
            hocviens: Object.entries(attendance).map(
                ([hocvienid, hiendienyn]) => ({
                    hocvienid: hocvienid,
                    hiendienyn: hiendienyn,
                })
            ),
        };

        const response = await axios.post(
            `/api/school/save`,
            attendanceData,
            {
                headers: {
                    'token': localStorage.getItem("accessToken")
                }
            }
        );

        const result = response.data;

        if (result.success) {
            showToast(
                `Đã lưu điểm danh "${currentSubject.mhten}"!\n\Hiện diện: ${Object.values(attendance).filter((status) => status).length
                }/${students.length} sinh viên`,
                "success"
            );
            openStudentList(
                `${encodeURIComponent(JSON.stringify(currentSubject))}`
            );
        } else {
            showToast("Điểm danh không thành công, vui lòng thử lại!", "error");
        }
    } catch (err) {
        showToast("Có lỗi xảy ra, vui lòng thử lại sau!", "error");
    } finally {
        btn.querySelector(".fa-floppy-disk").style.display = "inline-block";
        btn.querySelector(".fa-spinner").style.display = "none";
        btn.disabled = false;
    }
    clearFilter();
}

// QR Code Generation Functions
function generateQRCode(isWeb = false) {
    if (!currentSubject) return;

    const timestamp = new Date().getTime();
    const objectData = JSON.stringify(currentSubject);
    const compressed = LZString.compressToBase64(objectData);

    let qrData;
    if (isWeb) {
        const queryString = new URLSearchParams(
            Object.fromEntries(
                Object.entries(currentSubject).map(([k, v]) => [k, v ?? ""]))
        ).toString();

        qrData = `https://tuyensinhcd-dh.viendong.edu.vn/school/scanned?exp=${timestamp}&${queryString}`;
    } else {
        qrData = `QR_${timestamp}_${compressed}`;
    }

    document.getElementById('qrTitle').textContent = `QR Code - ${currentSubject?.mhten}`;
    document.getElementById('qrData').textContent = qrData;

    generateQRCanvas(qrData);
    document.getElementById('qrModal').classList.add('active');

    showToast('Đã tạo mã QR thành công!', 'success');
    console.log("QR mới được tạo:", qrData);

    const btn = document.getElementById("regenerateBtn");

    let countdown = 30;

    btn.disabled = true;
    btn.style.background = "#6c757d"; 
    btn.innerHTML = `${countdown}s`;

    const timer = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            btn.innerHTML = `${countdown}s`;
        } else {
            clearInterval(timer);
            btn.disabled = false;
            btn.style.background = "#28a745";
            btn.innerHTML = '<i class="fas fa-refresh"></i> Tạo lại';

            console.log("Nút 'Tạo lại' đã sẵn sàng. QR hiện tại:", qrData);
        }
    }, 1000);
}

function generateQRCanvas(qrData) {
    const container = document.getElementById('qrCanvas');
    container.innerHTML = "";
    new QRCode(container, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });
}

function regenerateQR() {
    generateQRCode(true);

}

function downloadQR() {
    const canvas = document.getElementById('qrCanvas');
    const link = document.createElement('a');
    link.download = `QR_${currentSubject ? currentSubject.name : 'attendance'}_${formatDate(new Date())}.png`;
    link.href = canvas.toDataURL();
    link.click();
    showToast('Đã tải xuống mã QR!', 'success');
}

function closeQRModal() {
    document.getElementById('qrModal').classList.remove('active');
}

function showToast(message, type = "info") {
    const backgroundColor = {
        success: "#4CAF50",
        error: "#f44336",
        info: "#2196F3",
    };

    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: backgroundColor[type] || backgroundColor.info,
        stopOnFocus: true,
    }).showToast();
}