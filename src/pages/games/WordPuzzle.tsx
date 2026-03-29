import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

const POINTS_PER_WORD = 10;

// Türkçe anlamlı kelimeler listesi (örnek, genişletebilirsiniz)
const TURKISH_WORDS = [
  "kitap",
  "kalem",
  "masa",
  "sandalye",
  "araba",
  "okul",
  "elma",
  "beyaz",
  "mutlu",
  "güzel",
  "çocuk",
  "oyun",
  "bulut",
  "deniz",
  "bahar",
  "yazmak",
  "gölge",
  "çiçek",
  "yıldız",
  "hayal",
  "dost",
  "sevgi",
  "umut",
  "renkli",
  "güneş",
  "kış",
  "bahçe",
  "orman",
  "şehir",
  "yolcu",
  "kedi",
  "köpek",
  "kuş",
  "balık",
  "eldiven",
  "defter",
  "resim",
  "hikaye",
  "oyuncak",
  "soru",
  "cevap",
  "büyü",
  "dünya",
  "zaman",
  "saat",
  "dakika",
  "sözlük",
  "yazı",
  "çizgi",
  "ışık",
  "ses",
  "rüya",
];

function isTurkishWord(word: string): boolean {
  return TURKISH_WORDS.includes(word.toLowerCase());
}

function shuffleWordItems<T>(arr: T[]): T[] {
  return arr
    .map((a) => [Math.random(), a] as [number, T])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
}

const getWordsFromText = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length >= 4 && w.length <= 10);
};

type WordItem = {
  word: string;
  storyTitle: string;
};

type GameWord = WordItem & { id: string };

const getGameWords = (allWords: WordItem[]): GameWord[] => {
  let result: GameWord[] = [];
  for (let len = 4; len <= 10; len++) {
    const filtered = allWords.filter((w) => w.word.length === len);
    const unique = Array.from(new Set(filtered.map((w) => w.word)))
      .map((word) => filtered.find((w) => w.word === word))
      .filter((w): w is WordItem => Boolean(w));
    const selected = shuffleWordItems(unique);
    result = result.concat(
      selected.slice(0, 3).map((w, i) => ({ ...w, id: `${len}-${i}` }))
    );
  }
  return result;
};

const WordPuzzle: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [foundWords, setFoundWords] = useState<GameWord[]>([]);
  const [allWords, setAllWords] = useState<WordItem[]>([]);
  const [gameWords, setGameWords] = useState<GameWord[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [selectedIdxs, setSelectedIdxs] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const fetchWords = async () => {
      const storiesSnap = await getDocs(collection(db, "stories"));
      let words: WordItem[] = [];
      storiesSnap.forEach((doc) => {
        const data = doc.data();
        const storyWords = getWordsFromText(data.content || "");
        storyWords.forEach((word: string) => {
          if (isTurkishWord(word)) {
            words.push({ word, storyTitle: data.title || "Bilinmeyen" });
          }
        });
      });
      setAllWords(words);
    };
    fetchWords();
  }, []);

  useEffect(() => {
    if (allWords.length > 0) {
      const gw = getGameWords(allWords);
      setGameWords(gw);
      setCurrentIdx(0);
      setFoundWords([]);
      setScore(0);
      setGameOver(false);
      setUserInput("");
      setSelectedIdxs([]);
      if (gw.length > 0)
        setShuffled(
          shuffleWordItems(
            gw.map((w) => w.word.toUpperCase().split("").join(""))
          )
        );
    }
    // eslint-disable-next-line
  }, [allWords]);

  useEffect(() => {
    if (gameWords.length > 0 && currentIdx < gameWords.length) {
      setUserInput("");
      setSelectedIdxs([]);
      setShuffled(
        shuffleWordItems(gameWords[currentIdx].word.toUpperCase().split(""))
      );
    }
  }, [currentIdx, gameWords]);

  const handleLetterClick = (letter: string, idx: number) => {
    if (selectedIdxs.includes(idx)) return;
    setUserInput((prev) => prev + letter);
    setSelectedIdxs((prev) => [...prev, idx]);
  };

  const handleBackspace = () => {
    if (userInput.length === 0) return;
    setUserInput(userInput.slice(0, -1));
    setSelectedIdxs((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    if (gameWords.length > 0) {
      setCurrentIdx(0);
      setFoundWords([]);
      setScore(0);
      setGameOver(false);
      setUserInput("");
      setSelectedIdxs([]);
      setShuffled(
        shuffleWordItems(
          gameWords.map((w) => w.word.toUpperCase().split("").join(""))
        )
      );
    }
  };

  const handleShuffle = () => {
    if (gameWords.length === 0) return;
    setUserInput("");
    setSelectedIdxs([]);
    setShuffled(
      shuffleWordItems(gameWords[currentIdx].word.toUpperCase().split(""))
    );
  };

  const handleNewGame = () => {
    setAllWords([]); // tetikleyici olarak, yeni kelimeler çekilecek
  };

  const handleSubmit = () => {
    if (gameWords.length === 0) return;
    const current = gameWords[currentIdx];
    if (userInput.toLowerCase() === current.word.toLowerCase()) {
      setFoundWords([...foundWords, current]);
      setScore(score + current.word.length * POINTS_PER_WORD);
      if (currentIdx + 1 < gameWords.length) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setGameOver(true);
      }
    } else {
      setUserInput("");
      setSelectedIdxs([]);
      setShuffled(shuffleWordItems(current.word.toUpperCase().split("")));
    }
  };

  if (gameOver) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f8fafc 0%, #a7bfe8 100%)",
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
          <div
            style={{
              fontSize: 22,
              marginBottom: 12,
              color: "#4a5568",
            }}
          >
            Toplam Puan: {score}
          </div>
          <button
            onClick={handleNewGame}
            style={{
              background: "linear-gradient(90deg,#43e97b 0%,#38f9d7 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              borderRadius: 14,
              padding: "14px 36px",
              marginTop: 28,
              border: 0,
              boxShadow: "0 2px 8px #38f9d733",
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

  const current = gameWords[currentIdx];
  const currentLevel = current ? current.word.length : 4;
  const foundInLevel = foundWords.filter(
    (w) => w.word.length === currentLevel
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #a7bfe8 100%)",
        padding: 0,
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* Üst Başlık ve Puan */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(255,255,255,0.95)",
            borderRadius: 18,
            padding: "18px 32px",
            boxShadow: "0 2px 12px #a7bfe822",
            marginBottom: 0,
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#3b3b5c",
              letterSpacing: 1,
            }}
          >
            Kelime Bulmacası
          </span>
          <span
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#fff",
              background: "linear-gradient(90deg,#43e97b 0%,#38f9d7 100%)",
              borderRadius: 12,
              padding: "8px 28px",
              boxShadow: "0 2px 8px #38f9d733",
            }}
          >
            Puan: {score}
          </span>
        </div>

        {/* Bulunan Kelimeler */}
        <div
          style={{
            background: "rgba(255,255,255,0.93)",
            borderRadius: 16,
            boxShadow: "0 2px 8px #a7bfe822",
            padding: 18,
            textAlign: "center",
            marginBottom: 0,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 22,
              color: "#3b3b5c",
              marginBottom: 8,
            }}
          >
            Bulunan Kelimeler
          </div>
          <div
            style={{
              border: "2px solid #a7bfe8",
              borderRadius: 12,
              minHeight: 36,
              padding: 6,
              background: "#f8fafc",
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
            }}
          >
            {foundWords.map((w, i) => (
              <span
                key={w.id}
                style={{
                  color: "#43e97b",
                  fontWeight: 700,
                  fontSize: 18,
                  margin: "0 6px",
                  letterSpacing: 1,
                }}
              >
                {w.word.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Oyun Alanı */}
        <div
          style={{
            background: "rgba(255,255,255,0.98)",
            borderRadius: 22,
            boxShadow: "0 4px 24px #a7bfe822",
            padding: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Hikaye Başlığı */}
          <div
            style={{
              background: "linear-gradient(90deg,#a7bfe8 0%,#f8fafc 100%)",
              borderRadius: 14,
              padding: "10px 24px",
              textAlign: "center",
              fontWeight: 700,
              fontSize: 22,
              color: "#3b3b5c",
              marginBottom: 0,
              boxShadow: "0 1px 4px #a7bfe822",
            }}
          >
            {current?.storyTitle || ""}
          </div>

          {/* Kelime kutuları */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginBottom: 0,
            }}
          >
            {current &&
              current.word.split("").map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 54,
                    height: 54,
                    background: "#e0f7fa",
                    border: "2px solid #43e97b",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 34,
                    fontWeight: 800,
                    color: "#3b3b5c",
                    boxShadow: "0 2px 8px #38f9d733",
                  }}
                >
                  {userInput[idx] || "_"}
                </div>
              ))}
          </div>

          {/* Harfler (tıklanabilir) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginBottom: 0,
              flexWrap: "wrap",
            }}
          >
            {shuffled.map((letter, idx) => (
              <button
                key={idx}
                onClick={() => handleLetterClick(letter, idx)}
                disabled={selectedIdxs.includes(idx)}
                style={{
                  width: 54,
                  height: 54,
                  background: selectedIdxs.includes(idx)
                    ? "#cfd8dc"
                    : "linear-gradient(135deg,#38f9d7 0%,#43e97b 100%)",
                  border: "2px solid #43e97b",
                  borderRadius: 10,
                  fontSize: 32,
                  fontWeight: 800,
                  color: selectedIdxs.includes(idx) ? "#90a4ae" : "#fff",
                  marginRight: 4,
                  cursor: selectedIdxs.includes(idx)
                    ? "not-allowed"
                    : "pointer",
                  boxShadow: "0 2px 8px #38f9d733",
                  transition: "0.15s",
                  outline: "none",
                  opacity: selectedIdxs.includes(idx) ? 0.6 : 1,
                }}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Geri Al (Backspace) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 0,
            }}
          >
            <button
              onClick={handleBackspace}
              style={{
                background: "#f8fafc",
                color: "#3b3b5c",
                border: "2px solid #a7bfe8",
                borderRadius: 10,
                padding: "8px 28px",
                fontWeight: 700,
                fontSize: 18,
                marginTop: 8,
                boxShadow: "0 1px 4px #a7bfe822",
                cursor: userInput.length === 0 ? "not-allowed" : "pointer",
                opacity: userInput.length === 0 ? 0.5 : 1,
                transition: "0.15s",
              }}
              disabled={userInput.length === 0}
            >
              Geri Al
            </button>
          </div>

          {/* Butonlar */}
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              marginBottom: 0,
              marginTop: 8,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleReset}
              style={{
                flex: 1,
                minWidth: 120,
                background: "linear-gradient(90deg,#a7bfe8 0%,#f8fafc 100%)",
                color: "#3b3b5c",
                fontWeight: 700,
                border: 0,
                borderRadius: 10,
                padding: "12px 0",
                fontSize: 18,
                boxShadow: "0 1px 4px #a7bfe822",
                cursor: "pointer",
                transition: "0.15s",
              }}
            >
              Sıfırla
            </button>
            <button
              onClick={handleShuffle}
              style={{
                flex: 1,
                minWidth: 120,
                background: "linear-gradient(90deg,#38f9d7 0%,#43e97b 100%)",
                color: "#fff",
                fontWeight: 700,
                border: 0,
                borderRadius: 10,
                padding: "12px 0",
                fontSize: 18,
                boxShadow: "0 1px 4px #38f9d733",
                cursor: "pointer",
                transition: "0.15s",
              }}
            >
              Karıştır
            </button>
            <button
              onClick={handleSubmit}
              style={{
                flex: 1,
                minWidth: 120,
                background: "linear-gradient(90deg,#f7971e 0%,#ffd200 100%)",
                color: "#3b3b5c",
                fontWeight: 700,
                border: 0,
                borderRadius: 10,
                padding: "12px 0",
                fontSize: 18,
                boxShadow: "0 1px 4px #ffd20033",
                cursor:
                  userInput.length !== (current?.word.length || 0)
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  userInput.length !== (current?.word.length || 0) ? 0.6 : 1,
                transition: "0.15s",
              }}
              disabled={userInput.length !== (current?.word.length || 0)}
            >
              Kontrol Et
            </button>
          </div>

          {/* Seviye ve İlerleme */}
          <div
            style={{
              textAlign: "center",
              color: "#43e97b",
              fontWeight: 700,
              fontSize: 20,
              marginTop: 12,
              letterSpacing: 1,
            }}
          >
            {current
              ? `${current.word.length} harfli kelimeler (${
                  foundInLevel + 1
                }/3)`
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordPuzzle;
