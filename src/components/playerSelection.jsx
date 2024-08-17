import React, { useState } from 'react';

export const PlayerSelection = ({ onStartGame }) => {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [player1IsX, setPlayer1IsX] = useState(true);

    const handleStartGame = () => {
        const players = {
            X: player1IsX ? player1 : player2,
            O: player1IsX ? player2 : player1,
        };
        onStartGame(players);
    };

    return (
        <div className="player-selection">
            <h2>Ingresen sus nombres</h2>
            <div>
                <input
                    type="text"
                    placeholder="Nombre jugador 1"
                    value={player1}
                    onChange={(e) => setPlayer1(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Nombre jugador 2"
                    value={player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                />
            </div>
            <div>
                <label>
                    Elija quien empieza: <br /><br />
                    <input
                        type="radio"
                        checked={player1IsX}
                        onChange={() => setPlayer1IsX(true)}
                    />
                    {player1 || 'Jugador 1'} como X
                </label>
                <label>
                    <input
                        type="radio"
                        checked={!player1IsX}
                        onChange={() => setPlayer1IsX(false)}
                    />
                    {player2 || 'Jugador 2'} como O
                </label>
            </div>
            <button onClick={handleStartGame} disabled={!player1 || !player2}>
                Iniciar Juego
            </button>
        </div>
    );
}

