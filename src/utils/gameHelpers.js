export function placeMines(grid, mineCount, rows, cols) {
  let placedMines = 0;
  while (placedMines < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!grid[row][col].mine) {
      grid[row][col] = { ...grid[row][col], mine: true };
      placedMines++;
    }
  }
}

export function calculateAdjacentMines(grid, rows, cols) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],         [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col].mine) continue;

      let adjacentMines = 0;
      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol].mine) {
          adjacentMines++;
        }
      }
      grid[row][col] = { ...grid[row][col], adjacentMines };
    }
  }
}

export function revealSafeCells(grid, row, col) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],         [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  const queue = [[row, col]];
  let revealCount = 0;

  while (queue.length > 0) {
    const [currentRow, currentCol] = queue.shift();
    if (!grid[currentRow][currentCol].revealed) {
      grid[currentRow][currentCol].revealed = true;
      revealCount++;

      if (grid[currentRow][currentCol].adjacentMines === 0) {
        for (const [dx, dy] of directions) {
          const newRow = currentRow + dx;
          const newCol = currentCol + dy;
          if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length && !grid[newRow][newCol].revealed) {
            queue.push([newRow, newCol]);
          }
        }
      }
    }
  }

  return revealCount;
}

export function checkWinCondition(revealedCount, rows, cols, mines) {
  const totalCells = rows * cols;
  const safeCells = totalCells - mines;
  return revealedCount === safeCells;
}


export function relocateMine(grid, initialRow, initialCol) {
  grid[initialRow][initialCol].mine = false;

  let relocated = false;
  while (!relocated) {
    const newRow = Math.floor(Math.random() * grid.length);
    const newCol = Math.floor(Math.random() * grid[0].length);

    if (!grid[newRow][newCol].mine && (newRow !== initialRow || newCol !== initialCol)) {
      grid[newRow][newCol].mine = true;
      relocated = true;
    }
  }
}
