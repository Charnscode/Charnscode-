// script.js
 document.getElementById("signupForm").document.addEventListener("submit"), function (e)
    {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const whatsapp = document.getElementById("whatsapp").value;

      // Sauvegarde temporaire dans sessionStorage Noublions pas la base de données sera crée pour un stockage des données à long termes
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("whatsapp", whatsapp);

      window.location.href = "index.html"; // redirection vers le quiz
    };

let currentQuestionIndex = 0;
let score = 0;
let timer;
let questions = [];

// Mélanger un tableau
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Fusionner et mélanger HTML et CSS
function prepareQuestions() {
  const html = shuffle([...htmlQuestions]).slice(0, 5);
  const css = shuffle([...cssQuestions]).slice(0, 5);
  questions = shuffle([...html, ...css]);
}

function startQuiz() {
  prepareQuestions();
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    return showResult();
  }

  const questionObj = questions[currentQuestionIndex];
  document.getElementById("question").textContent = questionObj.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  questionObj.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      clearTimeout(timer);
      if (i === questionObj.answer) score++;
      currentQuestionIndex++;
      showQuestion();
    };
    optionsContainer.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  let time = 40;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `Temps restant : ${time}s`;

  timer = setInterval(() => {
    time--;
    timerDisplay.textContent = `Temps restant : ${time}s`;
    if (time <= 0) {
      clearInterval(timer);
      currentQuestionIndex++;
      showQuestion();
    }
  }, 1000);
}

function showResult() {
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const whatsapp = sessionStorage.getItem("whatsapp");

  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").textContent = `Bravo ${name}, votre score est : ${score}/10`;
event.preventDefault()
  // Envoi vers PHP
  fetch("submit.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&whatsapp=${encodeURIComponent(whatsapp)}&score=$tt{score}`
  });
}

// Lancement automatique
window.onload = startQuiz;