/**
 * Finds the next empty cell (represented by 0) on the board.
 * @param {Array<Array<number>>} board - The 9x9 Sudoku board.
 * @returns {Array<number>|null} - [row, col] of the empty cell, or null if no empty cells.
 */
export function findEmpty(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        return [r, c];
      }
    }
  }
  return null; // No empty cells found
}

/**
 * Checks if placing a number at a specific position is valid according to Sudoku rules.
 * @param {Array<Array<number>>} board - The 9x9 Sudoku board.
 * @param {number} num - The number to check (1-9).
 * @param {number} row - The row index.
 * @param {number} col - The column index.
 * @returns {boolean} - True if valid, false otherwise.
 */
export function isValid(board, num, row, col) {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num && x !== col) {
      return false;
    }
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num && x !== row) {
      return false;
    }
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num && (startRow + i !== row || startCol + j !== col)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Solves the Sudoku board using a backtracking algorithm.
 * This function modifies the board in place.
 * @param {Array<Array<number>>} board - The 9x9 Sudoku board to solve.
 * @returns {boolean} - True if a solution is found, false otherwise.
 */
export function solveSudoku(board) {
  const find = findEmpty(board);
  if (!find) {
    return true; // No empty cells, puzzle solved
  }

  const [row, col] = find;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, num, row, col)) {
      board[row][col] = num;

      if (solveSudoku(board)) {
        return true; // Solution found
      }

      board[row][col] = 0; // Backtrack
    }
  }
  return false; // No solution found for this path
}

/**
 * Checks if the current board state is a valid and complete Sudoku solution.
 * @param {Array<Array<number>>} board - The 9x9 Sudoku board.
 * @returns {boolean} - True if the board is completely and correctly filled, false otherwise.
 */
export function checkCurrentBoard(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const num = board[r][c];
      if (num === 0 || !isValid(board, num, r, c)) {
        return false; // Cell is empty or invalid
      }
    }
  }
  return true; // All cells are filled and valid
}

/**
 * Generates a new solvable Sudoku puzzle.
 * This is a simplified generation that fills a board and then removes cells.
 * It might not guarantee a unique solution, but it will be solvable.
 * @returns {Array<Array<number>>} - A new Sudoku puzzle.
 */
export function generateNewPuzzle() {
  let newBoard = Array(9).fill(0).map(() => Array(9).fill(0));

  // Fill the board completely using the solver
  // This ensures a valid starting point
  solveSudoku(newBoard);

  // Create a deep copy to remove cells from
  let puzzle = JSON.parse(JSON.stringify(newBoard));

  // Randomly remove cells to create the puzzle
  let cellsToRemove = 50; // Adjust difficulty here (more cells removed = harder)
  while (cellsToRemove > 0) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      cellsToRemove--;
    }
  }
  return puzzle;
}
