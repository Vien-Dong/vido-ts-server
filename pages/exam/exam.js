// Function to render a question
function renderQuestion(question) {
    const div = document.createElement('div');
    div.classList.add('col-md-6');

    div.innerHTML = `
        <div class="form-group">
            <label class="mb-1" for="question-${question}">Câu số ${question}</label>
            <input type="text" name="question-${question}" id="question-${question}" placeholder="Nhập câu hỏi" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
        </div>
        <div class="row form-group">
            <div class="col-md-6 mb-3">
                <input type="text" name="answer-A-${question}" id="answer-A-${question}" placeholder="Đáp án A" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
            </div>
            <div class="col-md-6">
                <input type="text" name="answer-B-${question}" id="answer-B-${question}" placeholder="Đáp án B" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
            </div>
            <div class="col-md-6">
                <input type="text" name="answer-C-${question}" id="answer-C-${question}" placeholder="Đáp án C" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
            </div>
            <div class="col-md-6">
                <input type="text" name="answer-D-${question}" id="answer-D-${question}" placeholder="Đáp án D" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
            </div>
        </div>
        <div class="form-group">
            <input type="text" name="correct-answer-${question}" id="correct-answer-${question}" placeholder="Đáp án đúng" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
        </div>
    `;

    return div;
}

function renderQuestions() {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = ''; // Clear previous questions

    // Render new questions
    const checkboxes = document.querySelectorAll('input[name="numQuestions"]');
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            const numQuestions = parseInt(checkbox.value); // Get the value of the checked checkbox
            for (let i = 0; i < numQuestions; i++) {
                const questionDiv = renderQuestion(i + 1);
                questionsContainer.appendChild(questionDiv);
            }
        }
    });
}

// Add event listener to all checkboxes
const checkboxes = document.querySelectorAll('input[name="numQuestions"]');
checkboxes.forEach(async function (checkbox) {
    checkbox.addEventListener('change', renderQuestions);
});

const getDataButton = document.getElementById('getDataButton');
getDataButton.addEventListener('click', async function () {
    let selectedValue = 0;
    const questions = [];
    const questionInputs = document.querySelectorAll('[id^="question-"]');

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedValue = checkbox.value;
        }
    });
    const title = document.getElementById("titleQuestion").value;
    const timeToDo = document.getElementById("timeToDo").value;
    const subjectID = document.getElementById("subject").value;

    questionInputs.forEach(function (input, index) {
        const questionText = input.value;
        const optionA = document.getElementById(`answer-A-${index + 1}`).value;
        const optionB = document.getElementById(`answer-B-${index + 1}`).value;
        const optionC = document.getElementById(`answer-C-${index + 1}`).value;
        const optionD = document.getElementById(`answer-D-${index + 1}`).value;
        const correctAnswer = document.getElementById(`correct-answer-${index + 1}`).value;

        const questionObject = {
            no: index + 1,
            questionText: questionText,
            optionA: { key: "A", text: optionA },
            optionB: { key: "B", text: optionB },
            optionC: { key: "C", text: optionC },
            optionD: { key: "D", text: optionD },
            correctAnswer: correctAnswer
        };

        questions.push(questionObject);
    });

    const exam = {
        id: generateUUID(),
        subjectID: parseInt(subjectID),
        title,
        timeToDo: parseInt(timeToDo),
        total: parseInt(selectedValue),
        exam: [{ questions }]
    }

    await axios.post('/api/subject/create-exam', exam)
        .then(data => {
            alert('Tạo thành công')
            console.log(data); // Log phản hồi từ máy chủ
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau.');
        });
});

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}