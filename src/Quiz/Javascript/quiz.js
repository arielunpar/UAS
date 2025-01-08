const quizBox = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const progressBarCurrent = document.getElementById('progressBarCurrent');
const loader = document.getElementById('loader');
const quizContainer = document.getElementById('quizContainer');
let myQuestions = [];
let slide; 
let currentSlide = 0; 
let score = 0; 

//fungsi untuk enable next button (dan submit button di trakhir)
function enableNextButton() {
    const nextButton = document.getElementById("next");
    nextButton.disabled = false;
    nextButton.style.cursor = "pointer";
    submitButton.disabled = false;
    submitButton.style.cursor = "pointer";
}

//fungsi untuk enable next button (dan submit button di trakhir)
function disableNextButton() {
    const nextButton = document.getElementById("next");
    nextButton.disabled = true;
    nextButton.style.cursor = "not-allowed";
    submitButton.disabled = true;
    submitButton.style.cursor = "not-allowed";
}

// mengambil data dari file json
fetch("https://opentdb.com/api.php?amount=10&category=19&type=multiple")
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        //melakukan formatting agar sesuai format yang diinginkan
        const formattedQuestions = loadedQuestions.results.map((item, index) => {
            
            const allAnswers = [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5);
            const correctKey = String.fromCharCode(97 + allAnswers.indexOf(item.correct_answer));
            
            return {
              question: item.question,
              answers: {
                a: allAnswers[0],
                b: allAnswers[1],
                c: allAnswers[2],
                d: allAnswers[3]
              },
              correctAnswer: correctKey
            };
          });
        myQuestions = formattedQuestions;
        quizContainer.classList.remove("hidden");
        loader.classList.add("hidden");
        buildQuiz();
        const previousButton = document.getElementById("previous");
        const nextButton = document.getElementById("next");

        slide = document.querySelectorAll(".slide");

        showSlide(currentSlide);
        previousButton.addEventListener("click", showPreviousSlide);
        nextButton.addEventListener("click", showNextSlide);
        submitButton.addEventListener('click', countScore);
    })
    .catch((err) => {
        console.error(err);
    });

// untuk membangun quiz
function buildQuiz() {
    const output = [];

    // menampilkan pertanyaan dalam banyak slide
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];

            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}"
                    value="${letter}" class="rad_butn"
                    onclick="enableNextButton();">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="slide">
                <div class="question"> ${(questionNumber + 1)}.
                ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>
                </div>`
            );
        }
    );

    quizBox.innerHTML = output.join('');
}

//fungsi untuk menghitung skor ketika sudah di submit jawaban
function countScore() {
    const answerBoxs = quizBox.querySelectorAll('.answers');
    let numCorrect = 0;
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerBox = answerBoxs[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerBox.querySelector(selector) || {}).value;
        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
        }
    });

    // menghitung skor
    score = numCorrect / myQuestions.length * 100;

    // menaruh skor di local storage
    localStorage.setItem('mostRecentScore', score);

    // menuju quizEnd.html
    window.location = "quizEnd.html";
}

// fungsi untuk menentukan slide yang tampil dan juga mengatur tombol button
function showSlide(n) {
    slide[currentSlide].classList.remove('active-slide');
    slide[n].classList.add('active-slide');
    currentSlide = n;

    // ngecek apakah sudah ada isi atau belum radio button sebelum mengaktifkan tombol next
    disableNextButton();
    const radioButtons = document.getElementsByClassName("rad_butn");
    const currentQuestionAnswers = Array.from(radioButtons).filter(radio => radio.name === `question${n}`);
    for (let i = 0; i < currentQuestionAnswers.length; i++) {
        if (currentQuestionAnswers[i].checked) {
            enableNextButton();
        }
    }

    // menyembunyikan previous button ketika slide 0
    if (currentSlide === 0) {
        document.getElementById("previous").style.display = 'none';
    } else {
        document.getElementById("previous").style.display = 'inline-block';
    }

    // ketika di slide terakhir, menyembunyikan next button dan memperlihatkan submit
    if (currentSlide === slide.length - 1) {
        document.getElementById("next").style.display = 'none';
        submitButton.style.display = 'inline-block';
    }

    // ketika di ditengah, maka submit button tidak ada
    else {
        document.getElementById("next").style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

// fungsi untuk tombol next button (ke pertanyaan berikut)
function showNextSlide() {
    showSlide(currentSlide + 1);
    progressBarCurrent.style.width = `${((currentSlide) / myQuestions.length) * 100}%`;
}

// fungsi untuk tombol previous button (ke pertanyaan sebelum)
function showPreviousSlide() {
    showSlide(currentSlide - 1);
    progressBarCurrent.style.width = `${((currentSlide) / myQuestions.length) * 100}%`;
}

