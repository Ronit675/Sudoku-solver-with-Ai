import React from 'react';
import styled from 'styled-components';

const CellContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1rem, 4vw, 1.8rem);
  font-weight: 600;
  border: 1px solid #d1d5db;
  box-sizing: border-box;
  background-color: #ffffff;
  
  /* Thicker borders for 3x3 blocks */
  &:nth-child(3n) {
    border-right: 3px solid #333;
  }
  &:nth-child(9n) {
    border-right: 1px solid #d1d5db;
  }
  &:nth-child(n+19):nth-child(-n+27),
  &:nth-child(n+46):nth-child(-n+54) {
    border-bottom: 3px solid #333;
  }
  &:nth-child(n+73):nth-child(-n+81) {
    border-bottom: 1px solid #d1d5db;
  }
  &:nth-child(9n) {
    border-right: 3px solid #333;
  }

  ${props => props.isPrefilled && `
    background-color: #e5e7eb;
    color: #4b5563;
    font-weight: 700;
  `}
`;

const CellInput = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  border: none;
  background-color: transparent;
  font-size: inherit;
  font-weight: inherit;
  color: #1f2937;
  outline: none;
  padding: 0;
  margin: 0;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SudokuCell = ({ value, isPrefilled, onChange, onKeyDown }) => {
  return (
    <CellContainer isPrefilled={isPrefilled}>
      <CellInput
        type="number"
        min="1"
        max="9"
        maxLength="1"
        value={value || ''}
        readOnly={isPrefilled}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </CellContainer>
  );
};

export default SudokuCell;
