import { useState } from 'react';
import Square from './Square';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  

  const handleClick = (i) => {
    // If the square is already filled or there's a winner, do nothing
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // Create a copy of the squares array
    const newSquares = squares.slice();
    // Set the value of the clicked square to "X" or "O"
    newSquares[i] = xIsNext ? 'X' : 'O';
    // Update the squares state
    setSquares(newSquares);
    // Toggle the turn
    setXIsNext(!xIsNext);
  };

  // Calculate the winner
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    // If there's a winner, display who won
    status = 'Winner: ' + winner;
  } else {
    // If there's no winner, display whose turn it is
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
    
        <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

// Added this function to check for a winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}