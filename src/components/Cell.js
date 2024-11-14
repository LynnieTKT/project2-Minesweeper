import React from 'react';
import './Cell.css'; 

function Cell({ cell, onClick, onRightClick }) {
  return (
    <div
      onClick={onClick}
      onContextMenu={onRightClick}
      className={`cell 
        ${cell.revealed ? (cell.mine ? 'cell-mine' : 'cell-safe') : 'cell-unselected'} 
        ${cell.flagged ? 'cell-flagged' : ''}`}
      style={{
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: '1px solid black',
      }}
    >
      {cell.revealed && !cell.mine && cell.adjacentMines > 0 ? cell.adjacentMines : cell.flagged ? '🚩' : ''}
      {cell.revealed && cell.mine ? '💣' : ''}
    </div>
  );
}

export default Cell;
