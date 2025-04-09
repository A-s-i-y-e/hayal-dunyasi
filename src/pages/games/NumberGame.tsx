import React, { useState, useEffect } from "react";

const NumberGame: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    generateNewGame();
  }, []);

  const generateNewGame = () => {
    const newNumbers = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 10) + 1
    );
    const newTarget = Math.floor(Math.random() * 50) + 10;
    setNumbers(newNumbers);
    setTarget(newTarget);
    setSelectedNumbers([]);
    setMessage("");
  };

  const handleNumberClick = (number: number) => {
    setSelectedNumbers([...selectedNumbers, number]);
  };

  const checkSum = () => {
    const sum = selectedNumbers.reduce((a, b) => a + b, 0);
    if (sum === target) {
      setScore(score + 10);
      setMessage("Tebrikler! Doğru toplamı buldun!");
      setTimeout(() => {
        generateNewGame();
      }, 2000);
    } else {
      setMessage(`Toplam ${sum}, hedef ${target}. Tekrar dene!`);
      setSelectedNumbers([]);
    }
  };

  const resetSelection = () => {
    setSelectedNumbers([]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4">
            Sayı Oyunu
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Sayıları toplayarak hedef sayıya ulaş!
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Hedef: {target}
            </h2>
            <div className="flex justify-center gap-4 mb-4">
              {selectedNumbers.map((number, index) => (
                <span
                  key={index}
                  className="text-3xl font-bold text-purple-600"
                >
                  {number}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={checkSum}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Toplamı Kontrol Et
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

          <div className="grid grid-cols-3 gap-4">
            {numbers.map((number, index) => (
              <button
                key={index}
                onClick={() => handleNumberClick(number)}
                className="aspect-square bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl text-3xl font-bold text-purple-600 hover:from-purple-200 hover:to-pink-200 transition-colors"
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Puan: {score}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default NumberGame;
