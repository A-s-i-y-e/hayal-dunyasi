import React, { useState } from "react";

const WordPuzzle: React.FC = () => {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  // Örnek kelimeler ve harfler
  const words = ["KALEM", "KITAP", "DEFTER", "SILGI"];
  const letters = ["K", "A", "L", "E", "M", "I", "T", "P", "D", "F", "S", "G"];

  const handleLetterClick = (letter: string) => {
    setSelectedLetters([...selectedLetters, letter]);
  };

  const checkWord = () => {
    const word = selectedLetters.join("");
    if (words.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
      setMessage("Tebrikler! Yeni bir kelime buldun!");
    } else {
      setMessage("Bu kelimeyi zaten buldun veya geçerli bir kelime değil.");
    }
    setSelectedLetters([]);
  };

  const resetSelection = () => {
    setSelectedLetters([]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4">
            Kelime Bulmacası
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Harfleri birleştirerek kelimeleri bul!
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Seçilen Harfler
            </h2>
            <div className="flex justify-center gap-4 mb-4">
              {selectedLetters.map((letter, index) => (
                <span
                  key={index}
                  className="text-3xl font-bold text-purple-600"
                >
                  {letter}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={checkWord}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Kelimeyi Kontrol Et
              </button>
              <button
                onClick={resetSelection}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Sıfırla
              </button>
            </div>
          </div>

          {message && (
            <div className="text-center text-lg font-medium text-purple-600 mb-6">
              {message}
            </div>
          )}

          <div className="grid grid-cols-4 gap-4">
            {letters.map((letter, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(letter)}
                className="aspect-square bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl text-3xl font-bold text-purple-600 hover:from-purple-200 hover:to-pink-200 transition-colors"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Bulunan Kelimeler
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {foundWords.map((word, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 text-center"
              >
                <span className="text-xl font-bold text-purple-600">
                  {word}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordPuzzle;
