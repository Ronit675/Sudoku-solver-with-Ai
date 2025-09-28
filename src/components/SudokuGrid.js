import React from 'react';
import styled from 'styled-components';
import SudokuCell from './SudokuCell';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  width: 100%;
  max-width: 450px;
  aspect-ratio: 1 / 1;
  border: 3px solid #333;
  box-sizing: border-box;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const SudokuGrid = ({ board, originalBoard, onCellChange }) => {
  const handleCellChange = (row, col, value) => {
    // Only allow single digit numbers from 1-9
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 1 || numValue > 9) {
      onCellChange(row, col, 0);
    } else {
      onCellChange(row, col, numValue);
    }
  };

  const handleKeyDown = (e, row, col) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && e.target.value === '') {
      onCellChange(row, col, 0);
    }
  };

  return (
    <GridContainer>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            isPrefilled={originalBoard[rowIndex][colIndex] !== 0}
            onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
            onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
          />
        ))
      )}
    </GridContainer>
  );
};

export default SudokuGrid;
