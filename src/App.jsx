export default function App() {
  const goRegister = () => {
    alert("سيتم فتح صفحة التسجيل لاحقاً")
  }

  const goCompetitions = () => {
    alert("سيتم عرض قائمة المسابقات لاحقاً")
  }

  const goResults = () => {
    alert("سيتم عرض النتائج لاحقاً")
  }

  const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    cursor: "pointer",
    textAlign: "center"
  }

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "sans-serif",
        padding: "40px",
        background: "#f8fafc",
        minHeight: "100vh"
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          منصة مسابقة الموانئ
        </h1>

        <p style={{ color: "#475569", marginBottom: "30px" }}>
          منصة لإدارة التسجيل، عرض المسابقات، ومتابعة النتائج.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px"
          }}
        >
          {/* التسجيل */}
          <div style={cardStyle} onClick={goRegister}>
            <h3>التسجيل</h3>
            <p>إنشاء حساب وتسجيل المشاركين في المسابقة.</p>
          </div>

          {/* المسابقات */}
          <div style={cardStyle} onClick={goCompetitions}>
            <h3>المسابقات</h3>
            <p>عرض قائمة المسابقات الحالية والقادمة.</p>
          </div>

          {/* النتائج */}
          <div style={cardStyle} onClick={goResults}>
            <h3>النتائج</h3>
            <p>متابعة النتائج والترتيب النهائي للمشاركين.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
