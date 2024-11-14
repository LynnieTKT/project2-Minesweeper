import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import GameBoard from './components/GameBoard';
import Rules from './components/Rules';
import { GameProvider } from './context/GameContext'; 
import './App.css';

function Home() {
  const [text, setText] = useState("");
  const welcomeText = "Welcome to Minesweeper!";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + welcomeText[index]);
      index++;
      if (index === welcomeText.length) clearInterval(interval);
    }, 100); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <h1 className="welcome-text">{text}</h1>
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
