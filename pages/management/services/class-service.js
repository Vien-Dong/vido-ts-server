let allClasses = [];

async function getClasses() {
    await axios.get("/api/class/get").then(function (response) {
        const result = response.data;
        if (!result) return;
        else if (result.status && result.payload) {
            allClasses = result.payload;
            renderClasses(allClasses);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getClasses();

    const filterCheckbox = document.getElementById('filterToday');
    filterCheckbox.addEventListener('change', () => {
        console.log("asd");
        if (filterCheckbox.checked) {
            filterClasses();
        } else {
            renderClasses(allClasses);
        }
    });

    const btnReload = document.getElementById('btn-reload');
    btnReload.addEventListener('click', () => {
        window.location.reload();
    });
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function renderClasses(classes) {
    const tbody = document.getElementById('classTableBody');
    tbody.innerHTML = '';

    classes.forEach(classItem => {
        const tr = document.createElement('tr');

        const checkboxTd = document.createElement('td');
        checkboxTd.innerHTML = `
                    <div class="form-check check-tables">
                        <input class="form-check-input" type="checkbox" value="something">
                    </div>
                `;
        checkboxTd.style.width = "5%";
        tr.insertBefore(checkboxTd, tr.firstChild);

        const tdId = document.createElement('td');
        tdId.textContent = classItem.classID;
        tr.appendChild(tdId);

        const tdDate = document.createElement('td');
        tdDate.textContent = formatDate(classItem?.date || new Date());
        tr.appendChild(tdDate);

        const tdTotal = document.createElement('td');
        tdTotal.textContent = classItem?.students.length;
        tr.appendChild(tdTotal);

        const tdSent = document.createElement('td');
        tdSent.textContent = countSmsSentStudents(classItem?.students);
        tr.appendChild(tdSent);

        const tdFailed = document.createElement('td');
        tdFailed.textContent = countSmsFailedStudents(classItem?.students);
        tr.appendChild(tdFailed);

        const actionTd = document.createElement('td');
        actionTd.className = 'text-end';
        actionTd.innerHTML = `
                    <div class="actions">
                        <a href="javascript:;" data-class-item='${JSON.stringify(classItem)}' onclick="resendSMS(this)" class="btn btn-sm bg-success-light me-2">
                            <i class="feather-slack" data-bs-toggle="tooltip" title="Fix"></i>
                        </a>
                        <a href="edit-student.html" class="btn btn-sm bg-danger-light">
                            <i class="feather-edit" data-bs-toggle="tooltip" title="Edit"></i>
                        </a>
                    </div>
                `;
        tr.appendChild(actionTd);

        tbody.appendChild(tr);
    });
}

async function resendSMS(element) {
    var classItem = JSON.parse(element.getAttribute('data-class-item'));
    const body = {
        classID: classItem?.classID,
        date: classItem?.date
    }
    await axios.post("/api/mobile/resendSMS", body).then(function (response) {
        const result = response.data;
        if (!result) return;
        else if (result.success) {
            getClasses();
        }
    });
};

function countSmsSentStudents(students) {
    if (!students) return 0;
    return students.filter(student => student.hiendien && student.smsSent).length;
}

function countSmsFailedStudents(students) {
    if (!students) return 0;
    return students.filter(student => student.hiendien && !student.smsSent).length;
}

function filterClasses() {
    const today = new Date().toISOString().split('T')[0];
    const filteredClasses = allClasses.filter(classItem => {
        const classDate = new Date(classItem.date).toISOString().split('T')[0];
        return classDate === today;
    });
    renderClasses(filteredClasses);
}