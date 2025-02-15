let allStudents = [];

async function getStudents() {
    await axios.get("/api/student/get").then(function (response) {
        const result = response.data;
        if (!result) return;
        else if (result.status && result.payload) {
            allClasses = result.payload;
            renderStudents(allClasses);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getStudents();

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

function renderStudents(students) {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';

    students.forEach(studentItem => {
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
        tdId.textContent = studentItem._id.slice(-6);
        tr.appendChild(tdId);

        const tdMssv = document.createElement('td');
        tdMssv.textContent = studentItem?.mssv;
        tr.appendChild(tdMssv);

        const tdParentPhone = document.createElement('td');
        tdParentPhone.textContent = studentItem?.sdt_cha_me;
        tr.appendChild(tdParentPhone);

        const tdStudentPhone = document.createElement('td');
        tdStudentPhone.textContent = studentItem?.sdt_hoc_sinh;
        tr.appendChild(tdStudentPhone);

        const actionTd = document.createElement('td');
        actionTd.className = 'text-end';
        actionTd.innerHTML = `
                    <div class="actions">
                        <a href="javascript:;" class="btn btn-sm bg-success-light me-2">
                            <i class="feather-eye"></i>
                        </a>
                        <a href="edit-student.html" class="btn btn-sm bg-danger-light">
                            <i class="feather-edit"></i>
                        </a>
                    </div>
                `;
        tr.appendChild(actionTd);

        tbody.appendChild(tr);
    });
}