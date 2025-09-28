# Sudoku Game with AI Hints

A React-based Sudoku game with AI-powered hints using Google's Gemini API.

## Features

- **Interactive Sudoku Grid**: Click and type to fill in numbers
- **AI-Powered Hints**: Get intelligent hints from Google's Gemini AI
- **Multiple Game Modes**: 
  - Solve the current puzzle
  - Check your progress
  - Clear the board
  - Generate new puzzles
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: API key is stored locally for convenience

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Google AI Studio API key (for AI hints feature)

### Installation

1. Navigate to the project directory:
   ```bash
   cd "Sudoku and Ai"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key and paste it into the app's API key input field
5. Click "Save" to store it locally

## How to Play

1. **Fill in Numbers**: Click on any empty cell and type a number from 1-9
2. **Get Hints**: Click "Get Hint ✨" to get AI-powered suggestions
3. **Check Progress**: Use "Check" to verify your current entries
4. **Solve**: Click "Solve" to automatically solve the puzzle
5. **New Game**: Click "New Game" to generate a new puzzle
6. **Clear**: Click "Clear" to reset to the original puzzle state

## Project Structure

```
src/
├── components/
│   ├── SudokuGrid.js      # Main grid component
│   ├── SudokuCell.js      # Individual cell component
│   ├── ControlPanel.js    # Button controls
│   ├── MessageBox.js      # Status messages
│   └── ApiKeyInput.js     # API key input
├── utils/
│   └── sudokuUtils.js     # Sudoku logic and algorithms
├── App.js                 # Main app component
└── index.js              # Entry point
```

## Technologies Used

- **React 18**: Frontend framework
- **Styled Components**: CSS-in-JS styling
- **Google Gemini API**: AI-powered hints
- **Vanilla JavaScript**: Sudoku solving algorithms

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (one-way operation)

## Features in Detail

### Sudoku Solver
- Uses backtracking algorithm to solve puzzles
- Validates moves according to Sudoku rules
- Handles invalid inputs gracefully

### AI Integration
- Connects to Google's Gemini 1.5 Flash model
- Provides contextual hints for empty cells
- Explains the reasoning behind suggestions

### Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Touch-friendly interface

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
