import React, { useState } from "react";

const FRUITS = [
  { name: "Mango", emoji: "🥭" },
  { name: "Elma", emoji: "🍎" },
  { name: "Portakal", emoji: "🍊" },
  { name: "Limon", emoji: "🍋" },
  { name: "Ananas", emoji: "🍍" },
  { name: "Karpuz", emoji: "🍉" },
  { name: "Muz", emoji: "🍌" },
  { name: "İncir", emoji: "🍏" },
  { name: "Kiraz", emoji: "🍒" },
];

const SOFT_COLORS = [
  "#ffe082",
  "#b2ebf2",
  "#f8bbd0",
  "#c8e6c9",
  "#fff9c4",
  "#d1c4e9",
  "#ffecb3",
  "#b3e5fc",
  "#ffccbc",
  "#e1bee7",
];
function getRandomSoftColor(idx: number) {
  return SOFT_COLORS[idx % SOFT_COLORS.length];
}

const getRandomTarget = () => Math.floor(Math.random() * 9) + 1;

const NumberGame: React.FC = () => {
  const [target, setTarget] = useState<number>(getRandomTarget());
  const [selected, setSelected] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [foundNumbers, setFoundNumbers] = useState<number[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleFruitClick = (idx: number) => {
    if (selected.includes(idx)) {
      setSelected(selected.filter((i) => i !== idx));
    } else if (selected.length < target) {
      setSelected([...selected, idx]);
    }
  };

  const handleCheck = () => {
    if (selected.length === target) {
      setScore(score + 10);
      setFoundNumbers([...foundNumbers, target]);
      setMessage("Tebrikler! Doğru sayıda nesne seçtiniz.");
      setTimeout(() => {
        setTarget(getRandomTarget());
        setSelected([]);
        setMessage("");
      }, 1200);
    } else {
      setMessage(`Yanlış! ${target} nesne seçmelisiniz.`);
    }
  };

  const handleReset = () => {
    setSelected([]);
    setMessage("");
  };

  const handleNewGame = () => {
    setTarget(getRandomTarget());
    setSelected([]);
    setScore(0);
    setFoundNumbers([]);
    setMessage("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        padding: 0,
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* Üst Başlık ve Puan */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(90deg,#6a82fb 0%,#fc5c7d 100%)",
            borderRadius: 18,
            padding: "16px 30px",
            boxShadow: "0 2px 12px #6a82fb22",
            marginBottom: 0,
          }}
        >
          <span
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: 1,
            }}
          >
            Sayı Oyunu
          </span>
          <span
            style={{
              fontSize: 25,
              fontWeight: 800,
              color: "#fff",
              background: "linear-gradient(90deg,#43cea2 0%,#185a9d 100%)",
              borderRadius: 12,
              padding: "9px 26px",
              boxShadow: "0 2px 8px #43cea233",
            }}
          >
            Puan: {score}
          </span>
        </div>

        {/* Bulunan Sayılar */}
        <div
          style={{
            border: "2px solid #fff",
            borderRadius: 14,
            background: "linear-gradient(90deg,#e0eafc 0%,#cfdef3 100%)",
            marginBottom: 0,
            padding: 16,
            textAlign: "center",
            boxShadow: "0 1px 6px #b3c6e7",
          }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: 22,
              color: "#3a7bd5",
              marginBottom: 10,
            }}
          >
            Bulunan Sayılar
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              marginTop: 6,
            }}
          >
            {foundNumbers.map((n, i) => (
              <span
                key={i}
                style={{
                  border: "2px solid #fff",
                  borderRadius: 10,
                  padding: "7px 18px",
                  background: "#e3f2fd",
                  fontSize: 25,
                  boxShadow: "0 1px 6px #e3f2fd",
                  fontWeight: 800,
                  color: "#1976d2",
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* Hedef Sayı ve Talimat */}
        <div
          style={{
            background: "linear-gradient(135deg,#e0eafc 0%,#cfdef3 100%)",
            borderRadius: 16,
            padding: 26,
            textAlign: "center",
            fontWeight: 900,
            fontSize: 28,
            color: "#1976d2",
            marginBottom: 0,
            boxShadow: "0 2px 8px #b3c6e7",
          }}
        >
          <div style={{ fontSize: 42, fontWeight: 900, color: "#3b3b5c" }}>
            {target}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#1976d2",
              marginTop: 8,
            }}
          >
            nesne seçin
          </div>
        </div>

        {/* Meyve Seçimi */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginBottom: 0,
          }}
        >
          {FRUITS.map((fruit, idx) => (
            <button
              key={idx}
              onClick={() => handleFruitClick(idx)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: selected.includes(idx)
                  ? "3px solid #6a82fb"
                  : "2px solid #e0eafc",
                background: selected.includes(idx)
                  ? "linear-gradient(135deg,#43cea2 0%,#185a9d 100%)"
                  : "linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%)",
                borderRadius: 999,
                padding: 14,
                fontSize: 27,
                color: selected.includes(idx) ? "#fff" : "#3a7bd5",
                boxShadow: selected.includes(idx)
                  ? "0 2px 8px #6a82fb55"
                  : "0 1px 4px #b3c6e7",
                outline: "none",
                transition: "0.15s",
                minHeight: 80,
                minWidth: 80,
                margin: "0 auto",
                fontWeight: 800,
                cursor: "pointer",
                position: "relative",
                filter: selected.includes(idx) ? "brightness(1.1)" : undefined,
                opacity: selected.includes(idx) ? 0.95 : 1,
              }}
              onMouseOver={(e) => {
                if (!selected.includes(idx))
                  e.currentTarget.style.background =
                    "linear-gradient(135deg,#e0eafc 0%,#cfdef3 100%)";
              }}
              onMouseOut={(e) => {
                if (!selected.includes(idx))
                  e.currentTarget.style.background =
                    "linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%)";
              }}
            >
              <span style={{ fontSize: 40 }}>{fruit.emoji}</span>
              <span style={{ fontSize: 16, fontWeight: 700, marginTop: 5 }}>
                {fruit.name}
              </span>
            </button>
          ))}
        </div>

        {/* Mesaj */}
        {message && (
          <div
            style={{
              textAlign: "center",
              color: message.startsWith("Tebrikler") ? "#fff" : "#fff",
              fontWeight: 800,
              fontSize: 18,
              margin: "18px 0",
              background: message.startsWith("Tebrikler")
                ? "linear-gradient(90deg,#43cea2 0%,#185a9d 100%)"
                : "linear-gradient(90deg,#6a82fb 0%,#fc5c7d 100%)",
              borderRadius: 12,
              padding: "12px 0",
              boxShadow: "0 1px 8px #6a82fb33",
            }}
          >
            {message}
          </div>
        )}

        {/* Butonlar */}
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            marginBottom: 0,
            marginTop: 6,
          }}
        >
          <button
            onClick={handleCheck}
            style={{
              flex: 1,
              minWidth: 100,
              background: "linear-gradient(90deg,#43cea2 0%,#185a9d 100%)",
              color: "#fff",
              fontWeight: 800,
              border: 0,
              borderRadius: 12,
              padding: "12px 0",
              fontSize: 18,
              boxShadow: "0 1px 4px #43cea233",
              cursor: "pointer",
              transition: "0.15s",
            }}
          >
            Kontrol Et
          </button>
          <button
            onClick={handleReset}
            style={{
              flex: 1,
              minWidth: 100,
              background: "linear-gradient(90deg,#6a82fb 0%,#fc5c7d 100%)",
              color: "#fff",
              fontWeight: 800,
              border: 0,
              borderRadius: 12,
              padding: "12px 0",
              fontSize: 18,
              boxShadow: "0 1px 4px #6a82fb33",
              cursor: "pointer",
              transition: "0.15s",
            }}
          >
            Sıfırla
          </button>
          <button
            onClick={handleNewGame}
            style={{
              flex: 1,
              minWidth: 100,
              background: "linear-gradient(90deg,#b721ff 0%,#21d4fd 100%)",
              color: "#fff",
              fontWeight: 800,
              border: 0,
              borderRadius: 12,
              padding: "12px 0",
              fontSize: 18,
              boxShadow: "0 1px 4px #b721ff33",
              cursor: "pointer",
              transition: "0.15s",
            }}
          >
            Yeni Oyun
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberGame;
