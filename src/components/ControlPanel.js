import React from 'react';
import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  min-width: 120px;

  @media (max-width: 600px) {
    width: 100%;
    min-width: unset;
  }

  ${props => props.variant === 'primary' && `
    background-color: #4f46e5;
    color: white;
    border: none;

    &:hover {
      background-color: #4338ca;
      transform: translateY(-2px);
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }
  `}

  ${props => props.variant === 'secondary' && `
    background-color: #e0e7ff;
    color: #4f46e5;
    border: 2px solid #4f46e5;

    &:hover {
      background-color: #c7d2fe;
      transform: translateY(-2px);
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ControlPanel = ({ onSolve, onCheck, onClear, onNewGame, onGetHint }) => {
  return (
    <ButtonGroup>
      <Button variant="primary" onClick={onNewGame}>
        New Game
      </Button>
      <Button variant="primary" onClick={onSolve}>
        Solve
      </Button>
      <Button variant="primary" onClick={onGetHint}>
        Get Hint ✨
      </Button>
      <Button variant="secondary" onClick={onCheck}>
        Check
      </Button>
      <Button variant="secondary" onClick={onClear}>
        Clear
      </Button>
    </ButtonGroup>
  );
};

export default ControlPanel;
