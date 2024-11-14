import React from 'react';

function GameStatus({ win, gameOver, revealedCount, totalCells, remainingMines }) {
  return (
    <div className="game-status">
      {win && <h3 style={{ color: 'green' }}>Game over! You Won!</h3>}
      {gameOver && !win && <h3 style={{ color: 'red' }}>Game over!  You lost!</h3>}
      {!win && !gameOver && (
        <>
          <p>Cells Revealed: {revealedCount} / {totalCells}</p>
          <p>Remaining Mines: {remainingMines}</p>
        </>
      )}
    </div>
  );
}

export default GameStatus;
