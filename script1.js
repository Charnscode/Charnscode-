let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 60;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  let q = questions[currentQuestion];
  questionEl.textContent = q.question;
  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(index));
    answersEl.appendChild(btn);
  });
  startTimer();
}

function resetState() {
  clearInterval(timer);
  nextBtn.style.display = "none";
  answersEl.innerHTML = "";
  timeLeft = 60;
  timerEl.textContent = timeLeft;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(null);
    }
  }, 1000);
}

function selectAnswer(index) {
  clearInterval(timer);
  let q = questions[currentQuestion];
  const correct = q.correct === index;
  if (correct) score++;
  Array.from(answersEl.children).forEach((btn, i) => {
    if (i === q.correct) {
      btn.style.backgroundColor = "#00ffcc";
      btn.style.color = "black";
    } else {
      btn.style.opacity = "0.5";
    }
    btn.disabled = true;
  });
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.style.display = "none";
  answersEl.style.display = "none";
  timerEl.style.display = "none";
  nextBtn.style.display = "none";
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `Quiz termin\u00e9 !<br/> Score : ${score} / ${questions.length}`;
}

startQuiz();