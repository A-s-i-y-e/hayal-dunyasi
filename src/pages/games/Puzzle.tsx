import React, { useState, useEffect } from "react";

interface Tile {
  id: number;
  value: number;
  isCorrect: boolean;
}

const Puzzle: React.FC = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [gameComplete, setGameComplete] = useState<boolean>(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
    const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
    const newTiles = shuffledNumbers.map((value, index) => ({
      id: index,
      value,
      isCorrect: value === index + 1,
    }));
    setTiles(newTiles);
    setMoves(0);
    setGameComplete(false);
  };

  const handleTileClick = (clickedTile: Tile) => {
    if (gameComplete) return;

    const emptyTileIndex = tiles.findIndex((tile) => tile.value === 16);
    const clickedTileIndex = tiles.findIndex(
      (tile) => tile.id === clickedTile.id
    );

    // Boş kare ile tıklanan kare arasındaki mesafeyi kontrol et
    const rowDiff = Math.abs(
      Math.floor(emptyTileIndex / 4) - Math.floor(clickedTileIndex / 4)
    );
    const colDiff = Math.abs((emptyTileIndex % 4) - (clickedTileIndex % 4));

    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      const newTiles = [...tiles];
      [newTiles[emptyTileIndex], newTiles[clickedTileIndex]] = [
        newTiles[clickedTileIndex],
        newTiles[emptyTileIndex],
      ];

      // Doğru pozisyonda olup olmadığını kontrol et
      newTiles.forEach((tile, index) => {
        tile.isCorrect = tile.value === index + 1;
      });

      setTiles(newTiles);
      setMoves(moves + 1);

      // Oyunun tamamlanıp tamamlanmadığını kontrol et
      if (newTiles.every((tile) => tile.isCorrect)) {
        setGameComplete(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4">
            Puzzle
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Parçaları birleştirerek resmi tamamla!
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

          <div className="grid grid-cols-4 gap-2 bg-gray-100 p-2 rounded-xl">
            {tiles.map((tile) => (
              <button
                key={tile.id}
                onClick={() => handleTileClick(tile)}
                className={`aspect-square rounded-lg text-2xl font-bold flex items-center justify-center transition-colors ${
                  tile.value === 16
                    ? "bg-transparent"
                    : tile.isCorrect
                    ? "bg-green-100 text-green-600"
                    : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 hover:from-purple-200 hover:to-pink-200"
                }`}
              >
                {tile.value !== 16 && tile.value}
              </button>
            ))}
          </div>
        </div>

        {gameComplete && (
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              Tebrikler! Puzzle'ı {moves} hamlede tamamladın!
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

export default Puzzle;
