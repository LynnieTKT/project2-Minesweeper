import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import GameBoard from './components/GameBoard';
import Rules from './components/Rules';
import { GameProvider } from './context/GameContext'; 
import './App.css';

function Home() {
  return (
    <div className="main-container">
      <h1 className="welcome-text">Welcome to Minesweeper!</h1>
    </div>
  );
}

function App() {
  return (
    <GameProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/game/easy" element={<GameBoard difficulty="easy" />} />
          <Route path="/game/medium" element={<GameBoard difficulty="medium" />} />
          <Route path="/game/hard" element={<GameBoard difficulty="hard" />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
