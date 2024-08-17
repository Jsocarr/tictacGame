import React, { useState, useEffect } from 'react';
import { Cuadrado, PlayerSelection, Copyright } from './components';
import confetti from 'canvas-confetti';

export const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState({ winner: null, line: [] });
  const [gameOver, setGameOver] = useState(false);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    const { winner, line } = calculateWinner(squares);
    if (winner) {
      setGameOver(true);
      setTimeout(() => {
        setWinnerInfo({ winner, line });
        launchConfetti();
      }, 300);
    } else if (squares.every(square => square !== null)) {
      setWinnerInfo({ winner: 'Draw', line: [] });
      setGameOver(true);
    }
  }, [squares]);

  const handleClick = (index) => {
    if (squares[index] || gameOver) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const status = winnerInfo.winner
    ? winnerInfo.winner === 'Draw'
      ? 'Empate!'
      : <span className="winner-text">Ganador: {players ? players[winnerInfo.winner] : ''}</span>
    : `Turno: ${players ? (isXNext ? players.X : players.O) : ''}`;

  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#bb0000', '#ffffff', '#00bb00', '#0000bb'],
    });
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setWinnerInfo({ winner: null, line: [] });
    setIsXNext(true);
    setGameOver(false);
  };

  const handleStartGame = (players) => {
    setPlayers(players);
  };

  const handleChangeNames = () => {
    setPlayers(null);
    restartGame();
  };

  return (
    <div>
      {!players ? (
        <PlayerSelection onStartGame={handleStartGame} />
      ) : (
        <div>
          <div className="status">{status}</div>
          <div className="board">
            {squares.map((square, index) => (
              <Cuadrado
                key={index}
                value={square}
                onClick={() => handleClick(index)}
                isWinningSquare={winnerInfo.line.includes(index)}
              />
            ))}
          </div>
          <div className="botones">
            <button onClick={restartGame}>Restart</button>
            <button onClick={handleChangeNames}>Salir</button>
          </div>
        </div>
      )}
      <Copyright />
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }

  return { winner: null, line: [] };
}

