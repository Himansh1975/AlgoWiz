import React from 'react';
import Node from './Node';

const Grid = ({ grid, handleNodeClick, cellSize, gridRef }) => {

  if (!grid || grid.length === 0 || !grid[0]) {
    return <div>Loading...</div>; // Or any other placeholder you prefer
  }
  
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-900 rounded-xl shadow-inner p-6" ref={gridRef}>
      <div
        className="grid gap-[1px]"
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${grid.length}, ${cellSize}px)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((node, colIndex) => (
            <Node
              key={`${rowIndex}-${colIndex}`}
              node={node}
              onClick={() => handleNodeClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;