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

function renderLiteratureQuestion() {
    const div = document.createElement('div');
    div.classList.add('col-md-12');

    div.innerHTML = `
        <div class="form-group">
            <label class="mb-1" for="question-literature">Điền link pdf vào đây</label>
            <input type="text" name="question-literature" id="question-literature" placeholder="Nhập link" autocomplete="off" class="form-control shadow-sm bg-white rounded mb-2" required>
            <span class="text-danger">Lưu ý: link phải có đuôi là .pdf tương đương với đường dẫn khi search trên google sẽ tự động tải file pdf về hoặc hỏi có muốn tải không.</span>
        </div>
        `
    return div;
}

function renderEnglishQuestion(priority) {
    const div = document.createElement('div');
    div.classList.add(`col-md-12`, `path-${priority}`);

    div.innerHTML = `
        <div class="row">
            <div class="col-md-6 form-group">
                <label class="mb-1" for="path-english-${priority}"><b>Tiêu đề phần ${convertToRoman(priority)}</b></label>
                <input type="text" name="path-english-${priority}" id="path-english-${priority}" placeholder="Nhập tiêu đề" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
            </div>
            <div class="col-md-6 form-group">
            <label class="mb-1 d-flex justify-content-between" for="number-english-${priority}">
                <b>Số lượng câu phần ${convertToRoman(priority)}</b>
                <div>
                    <input type="checkbox" id="isSpeech-${priority}" value="1" name="isSpeech-${priority}"
                        class="custom-control-input" style="width: 16px; height: 16px">
                    <label class="custom-control-label" for="isSpeech-${priority}">Có đoạn văn</label>
                </div>
            </label>
                <input type="number" name="number-english-${priority}" id="number-english-${priority}" placeholder="Nhập số câu" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
            </div>
        </div>
        <div class="row mt-2" id="speech-container-${priority}" style="display: none;">
            <div class="col-md-12 form-group">
                <label for="speech-english-${priority}" class="mb-1">Nhập đoạn văn</label>
                <textarea name="speech-english-${priority}" id="speech-english-${priority}" rows="3" class="form-control shadow-sm bg-white rounded"></textarea>
            </div>
        </div>
        <div class="row" id="questions-container-${priority}"></div>
        <button type="button" id="add-${priority}" class="btn btn-primary btn-block">Thêm phần câu hỏi</button>
        `
    const numberInput = div.querySelector(`#number-english-${priority}`);
    numberInput.addEventListener('input', function () {
        renderChildQuestions(parseInt(this.value), div, priority);
    });

    const isSpeechCheckbox = div.querySelector(`#isSpeech-${priority}`);
    isSpeechCheckbox.addEventListener('change', function () {
        const speechContainer = document.getElementById(`speech-container-${priority}`);
        if (this.checked) {
            speechContainer.style.display = 'block';
        } else {
            speechContainer.style.display = 'none';
        }
    });

    const addButton = div.querySelector(`#add-${priority}`);
    addButton.addEventListener('click', function () {
        const questionsContainer = document.getElementById('questions-container');
        questionsContainer.append(renderEnglishQuestion(priority + 1));
        addButton.remove();
    });

    return div;
}

function renderChildQuestions(numQuestions, parentDiv, priority) {
    const questionsContainer = parentDiv.querySelector(`#questions-container-${priority}`);
    questionsContainer.innerHTML = ''; // Clear previous inputs

    if (numQuestions > 0) {
        for (let i = 1; i <= numQuestions; i++) {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('col-md-6');
            questionDiv.innerHTML = `
                <div class="form-group">
                    <label class="mb-1" for="question-english-${i}">Câu hỏi ${i}</label>
                    <input type="text" name="question-english-${i}" id="question-english-${i}" placeholder="Nhập câu hỏi" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
                </div>
                <div class="row form-group">
                    <div class="col-md-6 mb-3">
                        <input type="text" name="answer-A-${i}" id="answer-A-${i}" placeholder="Đáp án A" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
                    </div>
                    <div class="col-md-6">
                        <input type="text" name="answer-B-${i}" id="answer-B-${i}" placeholder="Đáp án B" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
                    </div>
                    <div class="col-md-6">
                        <input type="text" name="answer-C-${i}" id="answer-C-${i}" placeholder="Đáp án C" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
                    </div>
                    <div class="col-md-6">
                        <input type="text" name="answer-D-${i}" id="answer-D-${i}" placeholder="Đáp án D" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" name="correct-answer-${i}" id="correct-answer-${i}" placeholder="Đáp án đúng" autocomplete="off" class="form-control shadow-sm bg-white rounded" required>
                </div>
            `;
            questionsContainer.appendChild(questionDiv);
        }
    }
}

function renderQuestions() {
    const selectedValue = document.getElementById("subject");
    if (!selectedValue.value) { alert("Bạn phải chọn môn học trước!"); return; }
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = ''; // Clear previous questions

    if (parseInt(selectedValue.value) === 1) {
        questionsContainer.append(renderLiteratureQuestion());
        return;
    }
    else if (parseInt(selectedValue.value) === 2) {
        questionsContainer.append(renderEnglishQuestion(1));
        return;
    }

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

function isPdfUrl(url) {
    return url.toLowerCase().endsWith('.pdf');
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
    const questionLink = document.getElementById("question-literature");
    const title = document.getElementById("titleQuestion").value;
    const timeToDo = document.getElementById("timeToDo").value;
    const subjectID = document.getElementById("subject").value;

    if (questionLink) {
        if (!isPdfUrl(questionLink.value)) {
            alert("Định dạng không đúng.");
            return;
        }
        const exam = {
            id: generateUUID(),
            subjectID: parseInt(subjectID),
            title,
            timeToDo: parseInt(timeToDo),
            total: parseInt(selectedValue),
            exam: [questionLink.value]
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
        return;
    }

    if(parseInt(subjectID) === 2)
    {
        await englishData();
        return;
    }

    console.log("not english");

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedValue = checkbox.value;
        }
    });

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

async function englishData() {
    let selectedValue = 0;
    let questionIndex = 0;
    const paths = document.querySelectorAll('[id^="path-"]');
    const questions = [];
    const title = document.getElementById("titleQuestion").value;
    const timeToDo = document.getElementById("timeToDo").value;
    const subjectID = document.getElementById("subject").value;
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedValue = checkbox.value;
        }
    });
    for (let i = 1; i <= paths.length; i++) {
        const container = document.getElementById(`questions-container-${i}`);
        const titlePath = document.getElementById(`path-english-${i}`).value;
        const numQuestions = document.getElementById(`number-english-${i}`).value;
        const speech = document.getElementById(`speech-english-${i}`).value;
        const questionChilds = [];
        let question = null;

        for (let j = 1; j <= numQuestions; j++) {
            const questionTextChild = container.querySelector(`#question-english-${j}`).value;
            const optionA = container.querySelector(`#answer-A-${j}`).value;
            const optionB = container.querySelector(`#answer-B-${j}`).value;
            const optionC = container.querySelector(`#answer-C-${j}`).value;
            const optionD = container.querySelector(`#answer-D-${j}`).value;
            const correctAnswer = container.querySelector(`#correct-answer-${j}`).value;

            const questionObject = {
                no: questionIndex + j,
                questionText: questionTextChild,
                optionA: { key: "A", text: optionA },
                optionB: { key: "B", text: optionB },
                optionC: { key: "C", text: optionC },
                optionD: { key: "D", text: optionD },
                correctAnswer: correctAnswer
            };

            questionChilds.push(questionObject);
        }
        questionIndex += parseInt(numQuestions);

        if(speech !== "")
        {
            question = {
                path: convertToRoman(i),
                title: titlePath,
                child: true,
                type: "speech",
                questions: [
                    {
                        speech,
                        questionChilds
                    }
                ]
            };
        }
        else {
            question = {
                path: convertToRoman(i),
                title: titlePath,
                child: false,
                questions: questionChilds
            };
        }
        
        questions.push(question);
    }

    const exam = {
        id: generateUUID(),
        subjectID: parseInt(subjectID),
        title,
        timeToDo: parseInt(timeToDo),
        total: parseInt(selectedValue),
        exam: questions
    };
    await axios.post('/api/subject/create-exam', exam)
        .then(data => {
            alert('Tạo thành công')
            console.log(data); // Log phản hồi từ máy chủ
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau.');
        });
}

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

function convertToRoman(num) {
    const romanNumerals = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    let result = '';

    for (let key in romanNumerals) {
        while (num >= romanNumerals[key]) {
            result += key;
            num -= romanNumerals[key];
        }
    }

    return result;
}