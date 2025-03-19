import { useState } from 'react';
import Square from './Square';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  // Calculate the winner and the winning squares
  const winnerResult = calculateWinner(squares);
  const winner = winnerResult ? winnerResult.winner : null;
  const winningSquares = winnerResult ? winnerResult.line : [];

  // Determine the game status
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every((square) => square !== null)) {
    status = 'It\'s a draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Function to create the board using two loops
  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 3; row++) {
      const squaresInRow = [];
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        squaresInRow.push(
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
            isWinning={winningSquares.includes(index)}
          />
        );
      }
      board.push(
        <div key={row} className="board-row">
          {squaresInRow}
        </div>
      );
    }
    return board;
  };

  return (
    <div>
      {/* Display the game status */}
      <div className="status">{status}</div>
      {/* Render the board using the renderBoard function */}
      {renderBoard()}
    </div>
  );
}

// Function to check for a winner and return the winner and winning squares
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal (top-left to bottom-right)
    [2, 4, 6], // Diagonal (top-right to bottom-left)
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }; // Return the winner and winning squares
    }
  }
  return null; // No winner yet
}