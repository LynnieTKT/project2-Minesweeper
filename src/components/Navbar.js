import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/rules">Rules</Link>
      <Link to="/game/easy">Easy Game</Link>
      <Link to="/game/medium">Medium Game</Link>
      <Link to="/game/hard">Hard Game</Link>
    </nav>
  );
}

export default Navbar;
