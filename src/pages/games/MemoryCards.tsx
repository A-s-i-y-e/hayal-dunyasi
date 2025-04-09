import React, { useState, useEffect } from "react";

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryCards: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [gameComplete, setGameComplete] = useState<boolean>(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
    const cardPairs = [...emojis, ...emojis];
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length === 2 ||
      cards[cardId].isFlipped ||
      cards[cardId].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards;
      if (cards[firstCard].value === cards[secondCard].value) {
        newCards[firstCard].isMatched = true;
        newCards[secondCard].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);

        if (newCards.every((card) => card.isMatched)) {
          setGameComplete(true);
        }
      } else {
        setTimeout(() => {
          newCards[firstCard].isFlipped = false;
          newCards[secondCard].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4">
            Hafıza Kartları
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Kartları eşleştirerek hafızanı geliştir!
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold text-gray-800">
              Hamle: {moves}
            </div>
            <button
              onClick={initializeGame}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Yeni Oyun
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-xl text-4xl flex items-center justify-center transition-transform duration-300 ${
                  card.isFlipped || card.isMatched
                    ? "bg-white shadow-lg transform rotate-y-180"
                    : "bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200"
                }`}
              >
                {(card.isFlipped || card.isMatched) && card.value}
              </button>
            ))}
          </div>
        </div>

        {gameComplete && (
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              Tebrikler! Oyunu {moves} hamlede tamamladın!
            </h2>
            <button
              onClick={initializeGame}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity text-lg"
            >
              Tekrar Oyna
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryCards;
