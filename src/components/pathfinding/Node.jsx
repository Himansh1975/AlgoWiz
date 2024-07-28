import React from 'react';

const Node = ({ node, onClick }) => {
  const getNodeClass = () => {
    if (node.isStart) return 'bg-green-500 shadow-lg shadow-green-500/50';
    if (node.isEnd) return 'bg-red-500 shadow-lg shadow-red-500/50';
    if (node.isWall) return 'bg-gray-600 shadow-inner';
    if (node.isPath) return 'bg-yellow-300 shadow-md shadow-yellow-300/50';
    if (node.isVisited) return 'bg-blue-300 shadow-sm shadow-blue-300/50';
    return 'bg-gray-200 hover:bg-gray-300';
  };

  const getNodeTitle = () => {
    if (node.isStart) return 'Start Node';
    if (node.isEnd) return 'End Node';
    if (node.isWall) return 'Wall';
    if (node.isPath) return 'Path Node';
    if (node.isVisited) return 'Visited Node';
    return 'Unvisited Node';
  };

  return (
    <div
      className={`
        ${getNodeClass()}
        cursor-pointer
        border
        border-black
      `}
      onClick={onClick}
      style={{ width: '100%', height: '100%' }}
      title={getNodeTitle()}
    >
      <div className="w-full h-full flex items-center justify-center">
        {node.isStart && <span className="text-xs">S</span>}
        {node.isEnd && <span className="text-xs">E</span>}
      </div>
    </div>
  );
};

export default Node;