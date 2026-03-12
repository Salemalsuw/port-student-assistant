import { useState } from "react";
import { questionsBank } from "./PortStudentAssistantApp.jsx";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [playerName, setPlayerName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [topPlayers, setTopPlayers] = useState(() => {
    const saved = localStorage.getItem("topPlayers");
    return saved ? JSON.parse(saved) : [];
  });

  const startCompetition = () => {
    if (!playerName.trim()) {
      alert("اكتب اسمك أولاً");
      return;
    }

    const shuffledQuestions = shuffleArray(questionsBank).map((q) => ({
      ...q,
      options: shuffleArray(q.options)
    }));

    setQuestions(shuffledQuestions);
    setAnswers([]);
    setCurrentIndex(0);
    setScreen("quiz");
  };

  const chooseAnswer = (option) => {
    const updated = [...answers];
    updated[currentIndex] = option;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (!answers[currentIndex]) {
      alert("اختر إجابة أولاً");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const score = answers.filter(
      (answer, index) => answer === questions[index].answer
    ).length;

    const updatedTopPlayers = [...topPlayers, { name: playerName, score }]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setTopPlayers(updatedTopPlayers);
    localStorage.setItem("topPlayers", JSON.stringify(updatedTopPlayers));
    setScreen("result");
  };

  const resetToHome = () => {
    setPlayerName("");
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
    setScreen("home");
  };

  const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    textAlign: "center",
    cursor: "pointer"
  };

  if (screen === "register") {
    return (
      <div dir="rtl" style={{ fontFamily: "sans-serif", padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto", background: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
          <h1>تسجيل المشارك</h1>

          <input
            type="text"
            placeholder="اكتب اسمك"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              borderRadius: "10px",
              border: "1px solid #ccc"
            }}
          />

          <button
            onClick={startCompetition}
            style={{
              marginTop: "16px",
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer"
            }}
          >
            ابدأ المسابقة
          </button>

          <button
            onClick={resetToHome}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              background: "white",
              cursor: "pointer"
            }}
          >
            رجوع
          </button>
        </div>
      </div>
    );
  }

  if (screen === "quiz") {
    return (
      <div dir="rtl" style={{ fontFamily: "sans-serif", padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", background: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
          <h2>السؤال {currentIndex + 1} من {questions.length}</h2>
          <h3 style={{ marginTop: "20px" }}>{questions[currentIndex].question}</h3>

          <div style={{ marginTop: "20px" }}>
            {questions[currentIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => chooseAnswer(option)}
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "10px",
                  padding: "12px",
                  borderRadius: "10px",
                  border: answers[currentIndex] === option ? "2px solid #2563eb" : "1px solid #ccc",
                  background: answers[currentIndex] === option ? "#dbeafe" : "white",
                  cursor: "pointer"
                }}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={nextQuestion}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background: "#16a34a",
              color: "white",
              cursor: "pointer"
            }}
          >
            {currentIndex === questions.length - 1 ? "إنهاء المسابقة" : "السؤال التالي"}
          </button>
        </div>
      </div>
    );
  }

  if (screen === "result") {
    const score = answers.filter(
      (answer, index) => answer === questions[index].answer
    ).length;

    return (
      <div dir="rtl" style={{ fontFamily: "sans-serif", padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", background: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
          <h1>النتيجة</h1>
          <p style={{ fontSize: "20px" }}>اسم المشارك: {playerName}</p>
          <p style={{ fontSize: "20px" }}>
            الدرجة: {score} / {questions.length}
          </p>

          <h2 style={{ marginTop: "30px" }}>أفضل 3 مشاركين</h2>
          {topPlayers.length === 0 ? (
            <p>لا يوجد مشاركون بعد</p>
          ) : (
            <ol>
              {topPlayers.map((player, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  {player.name} - {player.score}
                </li>
              ))}
            </ol>
          )}

          <button
            onClick={resetToHome}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer"
            }}
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" style={{ fontFamily: "sans-serif", padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>منصة مسابقة الموانئ</h1>
        <p style={{ color: "#475569", marginBottom: "30px", fontSize: "20px" }}>
          منصة لإدارة التسجيل، عرض المسابقات، ومتابعة النتائج.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          <div style={cardStyle} onClick={() => setScreen("register")}>
            <h3>التسجيل</h3>
            <p>ابدأ المسابقة بعد تسجيل الاسم.</p>
          </div>

          <div style={cardStyle} onClick={() => alert("يمكنك إضافة قائمة المسابقات لاحقاً")}>
            <h3>المسابقات</h3>
            <p>عرض قائمة المسابقات الحالية والقادمة.</p>
          </div>

          <div style={cardStyle} onClick={() => setScreen("result")}>
            <h3>النتائج</h3>
            <p>عرض أفضل 3 مشاركين والنتائج النهائية.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
