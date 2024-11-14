import React from 'react';

function Rules() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Rules of Minesweeper</h2>
      <p>
        The goal of Minesweeper is to reveal all the cells on the board without hitting a mine.
        Use the numbers in revealed cells to figure out how many mines are adjacent to each cell.
      </p>
      <ul>
        <li>Click on a cell to reveal it.</li>
        <li>If a cell contains a mine, you lose the game.</li>
        <li>If a cell shows a number, that number represents the number of adjacent cells that contain mines.</li>
        <li>Reveal all safe cells to win the game!</li>
      </ul>
    </div>
  );
}

export default Rules;
