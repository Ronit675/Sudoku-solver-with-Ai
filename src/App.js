import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SudokuGrid from './components/SudokuGrid';
import ControlPanel from './components/ControlPanel';
import MessageBox from './components/MessageBox';
import ApiKeyInput from './components/ApiKeyInput';
import { solveSudoku, checkCurrentBoard, generateNewPuzzle, isValid } from './utils/sudokuUtils';

const AppContainer = styled.div`
  font-family: 'Inter', sans-serif;
  background-color: #f0f4f8;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const SudokuContainer = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
  width: 500px;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

// Initial puzzle (0 represents empty cells) - a medium difficulty puzzle
const initialPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function App() {
  const [currentBoard, setCurrentBoard] = useState([]);
  const [originalBoard, setOriginalBoard] = useState([]);
  const [message, setMessage] = useState('Ready to play!');
  const [messageType, setMessageType] = useState('');
  const [apiKey, setApiKey] = useState('');

  // Initialize the game
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
    
    // Start with the predefined initial puzzle
    const initialBoard = JSON.parse(JSON.stringify(initialPuzzle));
    setOriginalBoard(initialBoard);
    setCurrentBoard(initialBoard);
    setMessage('Welcome! Click "New Game" or solve this one.');
  }, []);

  const showMessage = (msg, type = '') => {
    setMessage(msg);
    setMessageType(type);
  };

  const handleCellChange = (row, col, value) => {
    setCurrentBoard(prev => {
      const newBoard = [...prev];
      newBoard[row] = [...newBoard[row]];
      newBoard[row][col] = value;
      return newBoard;
    });
    showMessage('Ready to play!');
  };

  const handleSolve = () => {
    const boardToSolve = JSON.parse(JSON.stringify(currentBoard));
    showMessage('Solving...', '');
    
    setTimeout(() => {
      if (solveSudoku(boardToSolve)) {
        setCurrentBoard(boardToSolve);
        showMessage('Puzzle solved!', 'success');
      } else {
        showMessage('Could not solve the puzzle. Check your initial entries!', 'error');
      }
    }, 100);
  };

  const handleCheck = () => {
    showMessage('Checking...', '');
    setTimeout(() => {
      if (checkCurrentBoard(currentBoard)) {
        showMessage('Looks good! Keep going or you solved it!', 'success');
      } else {
        showMessage('There are errors or empty cells. Keep trying!', 'error');
      }
    }, 100);
  };

  const handleClear = () => {
    const clearedBoard = JSON.parse(JSON.stringify(originalBoard));
    setCurrentBoard(clearedBoard);
    showMessage('Board cleared!', 'success');
  };

  const handleNewGame = () => {
    showMessage('Generating new puzzle...', '');
    setTimeout(() => {
      const newPuzzle = generateNewPuzzle();
      setOriginalBoard(JSON.parse(JSON.stringify(newPuzzle)));
      setCurrentBoard(JSON.parse(JSON.stringify(newPuzzle)));
      showMessage('New game started!', 'success');
    }, 100);
  };

  const handleGetHint = async () => {
    if (!apiKey) {
      showMessage('Please enter your Gemini API key and click Save.', 'error');
      return;
    }

    showMessage('Getting a hint from AI...', '');
    
    // Find first empty cell
    let emptyCell = null;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (currentBoard[r][c] === 0) {
          emptyCell = [r, c];
          break;
        }
      }
      if (emptyCell) break;
    }

    if (!emptyCell) {
      showMessage('The board is already solved! No hints needed.', 'success');
      return;
    }

    const [row, col] = emptyCell;

    const prompt = `Given the following Sudoku board, find a valid number (1-9) that can be placed in row ${row}, column ${col} (0-indexed). Provide the suggested number and a very brief explanation for why it's a good move. Ensure the number is valid according to standard Sudoku rules (no duplicates in row, column, or 3x3 box).

    Board:
    ${JSON.stringify(currentBoard)}

    Provide the response in JSON format with the following structure:
    {
      "hintFound": boolean,
      "row": number,
      "col": number,
      "value": number,
      "explanation": string,
      "message": string
    }
    If no valid hint can be found for this specific cell, set hintFound to false and provide a message.`;

    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];

    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        const detail = (result && (result.error && result.error.message)) || response.statusText;
        showMessage(`AI request failed: ${detail}`, 'error');
        return;
      }

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const rawText = result.candidates[0].content.parts[0].text || '';
        let parsedHint;
        try {
          parsedHint = JSON.parse(rawText);
        } catch (e) {
          showMessage('AI returned an unexpected format. Try again.', 'error');
          return;
        }

        if (parsedHint.hintFound && parsedHint.row === row && parsedHint.col === col &&
            parsedHint.value >= 1 && parsedHint.value <= 9 &&
            isValid(currentBoard, parsedHint.value, parsedHint.row, parsedHint.col)) {
          setCurrentBoard(prev => {
            const newBoard = [...prev];
            newBoard[parsedHint.row] = [...newBoard[parsedHint.row]];
            newBoard[parsedHint.row][parsedHint.col] = parsedHint.value;
            return newBoard;
          });
          showMessage(`Hint: Place ${parsedHint.value} at (${parsedHint.row + 1}, ${parsedHint.col + 1}). ${parsedHint.explanation}`, 'success');
        } else {
          showMessage(parsedHint.message || 'Could not get a useful hint. Try again!', 'error');
        }
      } else {
        const blocked = (result.promptFeedback && result.promptFeedback.blockReason) || 'No candidates';
        showMessage(`Failed to get a hint from AI (${blocked}). Please try again.`, 'error');
      }
    } catch (error) {
      console.error('Error fetching hint:', error);
      showMessage('An error occurred while getting a hint. Please check your network.', 'error');
    }
  };

  const handleApiKeySave = (key) => {
    if (!key) {
      localStorage.removeItem('gemini_api_key');
      setApiKey('');
      showMessage('API key cleared.', 'success');
    } else {
      localStorage.setItem('gemini_api_key', key);
      setApiKey(key);
      showMessage('API key saved locally.', 'success');
    }
  };

  return (
    <AppContainer>
      <SudokuContainer>
        <Title>Sudoku Game</Title>
        <ApiKeyInput onSave={handleApiKeySave} initialValue={apiKey} />
        <SudokuGrid 
          board={currentBoard} 
          originalBoard={originalBoard}
          onCellChange={handleCellChange}
        />
        <ControlPanel
          onSolve={handleSolve}
          onCheck={handleCheck}
          onClear={handleClear}
          onNewGame={handleNewGame}
          onGetHint={handleGetHint}
        />
        <MessageBox message={message} type={messageType} />
      </SudokuContainer>
    </AppContainer>
  );
}

export default App;
