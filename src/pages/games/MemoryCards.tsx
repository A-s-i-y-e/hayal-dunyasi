import React, { useState } from "react";

const EMOJI_CATEGORIES: Record<string, string[]> = {
  Hayvanlar: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🦁",
    "🐯",
    "🐨",
    "🐸",
    "🐵",
    "🦄",
    "🐷",
    "🐮",
    "🐔",
    "🐧",
    "🐦",
    "🐤",
  ],
  Meyveler: [
    "🍎",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🍒",
    "🍑",
    "🍍",
    "🥭",
    "🍈",
    "🍋",
    "🍊",
    "🍏",
    "🥝",
    "🍐",
    "🍅",
    "🥥",
    "🍆",
    "🍔",
    "🍋",
  ],
  Sebzeler: [
    "🥕",
    "🌽",
    "🥦",
    "🍆",
    "🥒",
    "🌶️",
    "🧄",
    "🧅",
    "🥔",
    "🍠",
    "🥬",
    "🍄",
    "🥗",
    "🥜",
    "🌰",
    "🍋",
    "🍅",
    "🥑",
    "🍋",
    "🥒",
  ],
  Taşıtlar: [
    "🚗",
    "🚕",
    "🚙",
    "🚌",
    "🚎",
    "🏎️",
    "🚓",
    "🚑",
    "🚒",
    "🚐",
    "🚚",
    "🚛",
    "🚜",
    "🛵",
    "🏍️",
    "🚲",
    "🛴",
    "🚂",
    "✈️",
    "🚁",
  ],
};

const CATEGORY_LIST = Object.keys(EMOJI_CATEGORIES);
const CATEGORY_GRADIENTS: Record<string, string> = {
  Hayvanlar: "linear-gradient(135deg,#f7971e 0%,#ffd200 100%)",
  Meyveler: "linear-gradient(135deg,#f857a6 0%,#ff5858 100%)",
  Sebzeler: "linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)",
  Taşıtlar: "linear-gradient(135deg,#30cfd0 0%,#330867 100%)",
};
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

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const getShuffledCards = (count: number, category: string): Card[] => {
  const pool = EMOJI_CATEGORIES[category];
  const selected = pool.slice(0, count / 2);
  const pairs = [...selected, ...selected];
  const shuffled = pairs
    .sort(() => Math.random() - 0.5)
    .map((value, i) => ({
      id: i,
      value,
      isFlipped: false,
      isMatched: false,
    }));
  return shuffled;
};

const MemoryCards: React.FC = () => {
  const MIN_CARDS = 4;
  const MAX_CARDS = 20;
  const ROUNDS_PER_LEVEL = 3;
  const getRandomCategory = () =>
    CATEGORY_LIST[Math.floor(Math.random() * CATEGORY_LIST.length)];
  const [category, setCategory] = useState<string>(getRandomCategory());
  const [level, setLevel] = useState<number>(MIN_CARDS);
  const [round, setRound] = useState<number>(1);
  const [cards, setCards] = useState<Card[]>(
    getShuffledCards(MIN_CARDS, category)
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [found, setFound] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const resetGame = () => {
    const newCategory = getRandomCategory();
    setCategory(newCategory);
    setLevel(MIN_CARDS);
    setRound(1);
    setCards(getShuffledCards(MIN_CARDS, newCategory));
    setFlipped([]);
    setScore(0);
    setFound([]);
    setGameOver(false);
  };

  const nextRoundOrLevel = () => {
    const newCategory = getRandomCategory();
    if (round < ROUNDS_PER_LEVEL) {
      setRound(round + 1);
      setCategory(newCategory);
      setCards(getShuffledCards(level, newCategory));
      setFlipped([]);
      setFound([]);
    } else if (level + 2 <= MAX_CARDS) {
      setLevel(level + 2);
      setRound(1);
      setCategory(newCategory);
      setCards(getShuffledCards(level + 2, newCategory));
      setFlipped([]);
      setFound([]);
    } else {
      setGameOver(true);
    }
  };

  const handleCardClick = (idx: number) => {
    if (
      cards[idx].isFlipped ||
      cards[idx].isMatched ||
      flipped.length === 2 ||
      gameOver
    )
      return;
    const newCards = [...cards];
    newCards[idx].isFlipped = true;
    const newFlipped = [...flipped, idx];
    setCards(newCards);
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [i1, i2] = newFlipped;
      if (newCards[i1].value === newCards[i2].value) {
        setTimeout(() => {
          const matchedCards = newCards.map((c, i) =>
            i === i1 || i === i2 ? { ...c, isMatched: true } : c
          );
          setCards(matchedCards);
          setFlipped([]);
          setScore((s) => s + 10);
          setFound((f) =>
            f.includes(newCards[i1].value) ? f : [...f, newCards[i1].value]
          );
          if (matchedCards.every((c) => c.isMatched)) {
            setTimeout(() => {
              nextRoundOrLevel();
            }, 800);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = newCards.map((c, i) =>
            i === i1 || i === i2 ? { ...c, isFlipped: false } : c
          );
          setCards(resetCards);
          setFlipped([]);
        }, 800);
      }
    }
  };

  if (gameOver) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #f7971e 0%, #43e97b 40%, #38f9d7 70%, #30cfd0 100%)",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.97)",
            borderRadius: 24,
            padding: 40,
            boxShadow: "0 8px 32px #0002",
            textAlign: "center",
            maxWidth: 400,
            width: "100%",
          }}
        >
          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              marginBottom: 18,
              color: "#3b3b5c",
            }}
          >
            Oyun Bitti!
          </h2>
          <div style={{ fontSize: 22, marginBottom: 12, color: "#4a5568" }}>
            Toplam Puan: {score}
          </div>
          <button
            onClick={resetGame}
            style={{
              background: "linear-gradient(90deg,#f857a6 0%,#ff5858 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              borderRadius: 14,
              padding: "14px 36px",
              marginTop: 28,
              border: 0,
              boxShadow: "0 2px 8px #ff585833",
              transition: "0.2s",
              cursor: "pointer",
            }}
          >
            Yeni Oyun
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f7971e 0%, #43e97b 40%, #38f9d7 70%, #30cfd0 100%)",
        padding: 0,
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: 40,
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}
      >
        {/* Üst Başlık ve Puan */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(255,255,255,0.97)",
            borderRadius: 20,
            padding: "22px 40px",
            boxShadow: "0 2px 16px #f7971e22",
            marginBottom: 0,
          }}
        >
          <span
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: "#3b3b5c",
              letterSpacing: 1,
            }}
          >
            Hafıza Oyunu
          </span>
          <span
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "#fff",
              background: "linear-gradient(90deg,#f857a6 0%,#ff5858 100%)",
              borderRadius: 14,
              padding: "10px 36px",
              boxShadow: "0 2px 8px #ff585833",
            }}
          >
            Puan: {score}
          </span>
        </div>

        {/* Seviye, Tur, Kategori */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 0,
            gap: 20,
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: 26,
              color: "#fff",
              background: "linear-gradient(90deg,#43e97b 0%,#38f9d7 100%)",
              borderRadius: 12,
              padding: "8px 24px",
              boxShadow: "0 1px 4px #43e97b33",
            }}
          >
            Seviye: {level} kart
          </span>
          <span
            style={{
              fontWeight: 800,
              fontSize: 24,
              color: "#fff",
              background: "linear-gradient(90deg,#f7971e 0%,#ffd200 100%)",
              borderRadius: 12,
              padding: "8px 24px",
              boxShadow: "0 1px 4px #ffd20033",
            }}
          >
            Tur: {round} / {ROUNDS_PER_LEVEL}
          </span>
          <span
            style={{
              fontWeight: 800,
              fontSize: 24,
              color: "#fff",
              background: CATEGORY_GRADIENTS[category],
              borderRadius: 12,
              padding: "8px 24px",
              boxShadow: "0 1px 4px #b3e5fc33",
            }}
          >
            Kategori: {category}
          </span>
          <button
            onClick={resetGame}
            style={{
              background: "linear-gradient(90deg,#f857a6 0%,#ff5858 100%)",
              color: "#fff",
              fontWeight: 800,
              border: 0,
              borderRadius: 12,
              padding: "12px 32px",
              fontSize: 20,
              boxShadow: "0 1px 4px #ff585833",
              cursor: "pointer",
              transition: "0.15s",
            }}
          >
            ▶ Yeni Oyun
          </button>
        </div>

        {/* Kart Alanı */}
        <div
          style={{
            border: "2.5px solid #fff",
            borderRadius: 28,
            minHeight: 340,
            background: "rgba(255,255,255,0.13)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 0,
            padding: 40,
            boxShadow: "0 2px 16px #43e97b22",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${level}, 1fr)`,
              gap: 32,
              width: "100%",
            }}
          >
            {cards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                style={{
                  width: 100,
                  height: 120,
                  borderRadius: 18,
                  fontSize: 54,
                  fontWeight: 900,
                  border: card.isMatched
                    ? "3px solid #43e97b"
                    : "2.5px solid #fff",
                  background: card.isMatched
                    ? CATEGORY_GRADIENTS[category]
                    : card.isFlipped
                    ? "linear-gradient(135deg,#b3e5fc 0%,#90caf9 100%)"
                    : "linear-gradient(135deg,#fffde7 0%,#ffe082 100%)",
                  color: card.isMatched
                    ? "#fff"
                    : card.isFlipped
                    ? "#1976d2"
                    : "#bfae3c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: card.isMatched
                    ? "0 2px 12px #43e97b55"
                    : "0 1px 6px #b3e5fc55",
                  transition: "0.15s",
                  outline: "none",
                  cursor: card.isMatched ? "default" : "pointer",
                  margin: "0 auto",
                  position: "relative",
                  borderBottom:
                    card.isFlipped && !card.isMatched
                      ? "5px solid #1976d2"
                      : undefined,
                  filter: card.isMatched ? "brightness(1.1)" : undefined,
                  opacity: card.isMatched ? 0.92 : 1,
                }}
                disabled={card.isMatched}
                onMouseOver={(e) => {
                  if (!card.isMatched && !card.isFlipped)
                    e.currentTarget.style.background =
                      "linear-gradient(135deg,#ffe082 0%,#fffde7 100%)";
                }}
                onMouseOut={(e) => {
                  if (!card.isMatched && !card.isFlipped)
                    e.currentTarget.style.background =
                      "linear-gradient(135deg,#fffde7 0%,#ffe082 100%)";
                }}
              >
                {card.isFlipped || card.isMatched ? card.value : "?"}
              </button>
            ))}
          </div>
        </div>

        {/* Bulunan Eşler */}
        <div
          style={{
            border: "2.5px solid #fff",
            borderRadius: 18,
            background: "linear-gradient(90deg,#fffde7 0%,#ffe082 100%)",
            marginBottom: 0,
            padding: 24,
            textAlign: "center",
            boxShadow: "0 1px 8px #ffe08233",
          }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: 26,
              color: "#f7971e",
              marginBottom: 12,
            }}
          >
            Bulunan Eşler
          </div>
          <div
            style={{
              display: "flex",
              gap: 18,
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            {found.map((emoji, i) => (
              <span
                key={i}
                style={{
                  border: "2.5px solid #fff",
                  borderRadius: 12,
                  padding: "8px 24px",
                  background: getRandomSoftColor(i),
                  fontSize: 38,
                  boxShadow: "0 1px 8px #fffde7aa",
                  fontWeight: 800,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCards;
