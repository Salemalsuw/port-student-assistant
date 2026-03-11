const questions = [
  {
    question: "ما المقصود بوحدة FEU في مجال الحاويات؟",
    answers: [
      "حاوية بطول 20 قدمًا",
      "حاوية بطول 40 قدمًا",
      "حاوية بطول 10 أقدام",
      "حاوية مبردة فقط"
    ],
    correct: 1
  },
  {
    question: "ما الاسم المختصر لوحدة الحاوية القياسية بطول 20 قدمًا؟",
    answers: ["FEU", "TPA", "TEU", "ETA"],
    correct: 2
  },
  {
    question: "أي من التالي يعد من الخدمات الأساسية في الموانئ؟",
    answers: [
      "مناولة الحاويات",
      "إنتاج النفط",
      "صناعة الطائرات",
      "استخراج المعادن"
    ],
    correct: 0
  },
  {
    question: "ما فائدة الميناء في سلاسل الإمداد؟",
    answers: [
      "تأخير الشحنات",
      "ربط النقل البحري بالبري واللوجستي",
      "استبدال المطارات بالكامل",
      "منع حركة البضائع"
    ],
    correct: 1
  },
  {
    question: "ماذا تعني كلمة Logistics؟",
    answers: [
      "الخدمات اللوجستية",
      "الأرصاد الجوية",
      "التعليم البحري",
      "التصدير فقط"
    ],
    correct: 0
  }
];

const passPercentage = 60;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const certificateSection = document.getElementById("certificate");

const studentNameInput = document.getElementById("studentName");
const studentSchoolInput = document.getElementById("studentSchool");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const certificateBtn = document.getElementById("certificateBtn");

const displayName = document.getElementById("displayName");
const questionCounter = document.getElementById("questionCounter");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answersContainer");

const resultName = document.getElementById("resultName");
const resultSchool = document.getElementById("resultSchool");
const resultScore = document.getElementById("resultScore");
const resultStatus = document.getElementById("resultStatus");

const certificateName = document.getElementById("certificateName");
const certificateSchool = document.getElementById("certificateSchool");
const certificateScore = document.getElementById("certificateScore");
const certificateDate = document.getElementById("certificateDate");
const certificateId = document.getElementById("certificateId");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let studentData = {
  name: "",
  school: ""
};

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", goToNextQuestion);
restartBtn.addEventListener("click", restartQuiz);
certificateBtn.addEventListener("click", showCertificate);

function startQuiz() {
  const name = studentNameInput.value.trim();
  const school = studentSchoolInput.value.trim();

  if (!name || !school) {
    alert("فضلاً اكتب اسم الطالب والجهة.");
    return;
  }

  studentData.name = name;
  studentData.school = school;

  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;

  displayName.textContent = studentData.name;

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  certificateSection.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestion];
  questionCounter.textContent = `${currentQuestion + 1} / ${questions.length}`;
  questionText.textContent = q.question;
  answersContainer.innerHTML = "";
  selectedAnswer = null;
  nextBtn.disabled = true;

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(index, btn));
    answersContainer.appendChild(btn);
  });
}

function selectAnswer(index, buttonElement) {
  selectedAnswer = index;
  nextBtn.disabled = false;

  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.classList.remove("selected");
  });

  buttonElement.classList.add("selected");
}

function goToNextQuestion() {
  if (selectedAnswer === null) return;

  if (selectedAnswer === questions[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= passPercentage;

  resultName.textContent = studentData.name;
  resultSchool.textContent = studentData.school;
  resultScore.textContent = `${score} من ${questions.length} (${percentage}%)`;
  resultStatus.textContent = passed ? "ناجح" : "لم يجتز";
  resultStatus.style.color = passed ? "green" : "crimson";

  if (passed) {
    certificateBtn.classList.remove("hidden");
  } else {
    certificateBtn.classList.add("hidden");
  }
}

function showCertificate() {
  const percentage = Math.round((score / questions.length) * 100);

  certificateName.textContent = studentData.name;
  certificateSchool.textContent = studentData.school;
  certificateScore.textContent = `${percentage}%`;
  certificateDate.textContent = new Date().toLocaleDateString("ar-SA");
  certificateId.textContent = generateCertificateId(studentData.name);

  resultScreen.classList.add("hidden");
  certificateSection.classList.remove("hidden");
}

function generateCertificateId(name) {
  const cleanName = name.replace(/\s+/g, "").slice(0, 4).toUpperCase();
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `PORT-${cleanName}-${randomPart}`;
}

function restartQuiz() {
  studentNameInput.value = "";
  studentSchoolInput.value = "";

  resultScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  certificateSection.classList.add("hidden");
  startScreen.classList.remove("hidden");
}
