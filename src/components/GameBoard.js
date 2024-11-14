// src/components/GameBoard.js
import React, { useState, useEffect, useCallback } from 'react';
import { placeMines, calculateAdjacentMines, revealSafeCells, checkWinCondition, relocateMine } from '../utils/gameHelpers';
import Cell from './Cell';
import GameStatus from './GameStatus';

const boardSizes = {
  easy: { rows: 8, cols: 8, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 }
};

function GameBoard({ difficulty = 'easy' }) {
  const { rows, cols, mines } = boardSizes[difficulty];
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [remainingMines, setRemainingMines] = useState(mines);

  // Generate a unique key for each difficulty level to store in localStorage
  const storageKey = `minesweeperGameState-${difficulty}`;

  // Save the game state to localStorage
  const saveGameState = useCallback(() => {
    const gameData = {
      grid,
      gameOver,
      win,
      revealedCount,
      isFirstClick,
      difficulty,
    };
    localStorage.setItem(storageKey, JSON.stringify(gameData));
  }, [grid, gameOver, win, revealedCount, isFirstClick, difficulty, storageKey]);

  // Function to start a new game
  const startNewGame = useCallback(() => {
    const newGrid = Array(rows).fill().map(() => Array(cols).fill({ revealed: false, mine: false, adjacentMines: 0, flagged: false }));
    placeMines(newGrid, mines, rows, cols);
    calculateAdjacentMines(newGrid, rows, cols);
    setGrid(newGrid);
    setRevealedCount(0);
    setGameOver(false);
    setWin(false);
    setIsFirstClick(true);
    setRemainingMines(mines);
    localStorage.removeItem(storageKey); 
  }, [rows, cols, mines, storageKey]);

  // Load the saved game state on mount
  useEffect(() => {
    const savedGameData = localStorage.getItem(storageKey);
    if (savedGameData) {
      const parsedData = JSON.parse(savedGameData);
      setGrid(parsedData.grid);
      setGameOver(parsedData.gameOver);
      setWin(parsedData.win);
      setRevealedCount(parsedData.revealedCount);
      setIsFirstClick(parsedData.isFirstClick);
    } else {
      startNewGame();
    }
  }, [startNewGame, storageKey]);

  // Save game state whenever relevant variables change
  useEffect(() => {
    if (!isFirstClick) { // Only save if the game has started
      saveGameState();
    }
  }, [grid, gameOver, win, revealedCount, isFirstClick, saveGameState]);

  const handleCellClick = (rowIndex, colIndex) => {
    if (gameOver || grid[rowIndex][colIndex].revealed || win) return;

    const updatedGrid = [...grid];

    // Safe First Click Logic
    if (isFirstClick) {
      setIsFirstClick(false);
      if (updatedGrid[rowIndex][colIndex].mine) {
        relocateMine(updatedGrid, rowIndex, colIndex); 
        calculateAdjacentMines(updatedGrid, rows, cols); 
      }
    }

    updatedGrid[rowIndex][colIndex].revealed = true;

    if (updatedGrid[rowIndex][colIndex].mine) {
      setGameOver(true);
      alert('Game over! You hit a mine.');
    } else {
      let localRevealedCount = revealedCount + 1;
      if (updatedGrid[rowIndex][colIndex].adjacentMines === 0) {
        localRevealedCount += revealSafeCells(updatedGrid, rowIndex, colIndex);
      }

      setRevealedCount(localRevealedCount);

      if (checkWinCondition(localRevealedCount, rows, cols, mines)) {
        setWin(true);
        alert('Congratulations! You won the game!');
      }
    }

    setGrid(updatedGrid);
  };

  const handleRightClick = (event, rowIndex, colIndex) => {
    event.preventDefault();
    if (gameOver || grid[rowIndex][colIndex].revealed || win) return;

    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex].flagged = !updatedGrid[rowIndex][colIndex].flagged;

    const flaggedMines = updatedGrid.flat().filter(cell => cell.flagged).length;
    setRemainingMines(mines - flaggedMines);

    setGrid(updatedGrid);
  };

  return (
    <div className="main-container">
      <h2>Minesweeper Game - Difficulty: {difficulty}</h2>
      <GameStatus 
        win={win} 
        gameOver={gameOver} 
        revealedCount={revealedCount} 
        totalCells={rows * cols} 
        remainingMines={remainingMines} 
      />
      <button onClick={startNewGame} style={{ margin: '10px', padding: '10px', fontSize: '16px' }}>Reset Game</button>
      <div
        className="grid-container"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 30px)`,
          gap: '2px',
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onRightClick={(e) => handleRightClick(e, rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GameBoard;
