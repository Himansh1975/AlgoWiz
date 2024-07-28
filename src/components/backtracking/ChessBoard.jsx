import React from 'react';

const ChessBoard = ({ board }) => {
  return (
    <div className="w-full h-full max-w-[80vh] max-h-[80vh] aspect-square">
      <div 
        className="grid gap-0.5 w-full h-full" 
        style={{ gridTemplateColumns: `repeat(${board.length}, 1fr)` }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`aspect-square ${
                (i + j) % 2 === 0 ? 'bg-gray-300' : 'bg-gray-600'
              } flex items-center justify-center`}
            >
              {cell === 1 && (
                <div className="w-3/4 h-3/4 rounded-full bg-yellow-400 shadow-lg" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChessBoard;