import React from 'react';

export const Cuadrado = ({ value, onClick, isWinningSquare }) => {
    return (
        <div
            className={`square ${value ? 'square-filled' : ''} ${isWinningSquare ? 'square-winner' : ''}`}
            onClick={onClick}
        >
            {value}
        </div>
    );
}


