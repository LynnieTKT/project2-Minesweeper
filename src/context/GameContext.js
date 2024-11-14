import React, { createContext, useContext, useState, useEffect } from 'react';
import { placeMines, calculateAdjacentMines } from '../utils/gameHelpers';

const GameContext = createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(loadGameState() || {
    difficulty: 'easy',
    grid: [],
    gameOver: false,
    win: false,
    revealedCount: 0,
    isFirstClick: true,
    flaggedCount: 0
  });

  // Load saved state
  function loadGameState() {
    const savedState = localStorage.getItem('minesweeperGameState');
    return savedState ? JSON.parse(savedState) : null;
  }

  // Save state to localStorage on state change
  useEffect(() => {
    localStorage.setItem('minesweeperGameState', JSON.stringify(gameState));
  }, [gameState]);

  const startNewGame = (difficulty = 'easy') => {
    const { rows, cols, mines } = {
      easy: { rows: 8, cols: 8, mines: 10 },
      medium: { rows: 16, cols: 16, mines: 40 },
      hard: { rows: 16, cols: 30, mines: 99 },
    }[difficulty];
    
    const newGrid = Array(rows)
      .fill()
      .map(() => Array(cols).fill({ revealed: false, mine: false, adjacentMines: 0, flagged: false }));
    
    placeMines(newGrid, mines, rows, cols);
    calculateAdjacentMines(newGrid, rows, cols);

    setGameState({
      difficulty,
      grid: newGrid,
      gameOver: false,
      win: false,
      revealedCount: 0,
      isFirstClick: true,
      flaggedCount: 0
    });
  };

  const incrementRevealedCount = () => {
    setGameState(prev => ({ ...prev, revealedCount: prev.revealedCount + 1 }));
  };

  const updateGameOver = (status) => {
    setGameState(prev => ({ ...prev, gameOver: status }));
  };

  const updateWinState = (status) => {
    setGameState(prev => ({ ...prev, win: status }));
  };

  const incrementFlaggedCount = (increment) => {
    setGameState(prev => ({ ...prev, flaggedCount: prev.flaggedCount + increment }));
  };

  const value = {
    gameState,
    setGameState,
    startNewGame,
    incrementRevealedCount,
    updateGameOver,
    updateWinState,
    incrementFlaggedCount
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
