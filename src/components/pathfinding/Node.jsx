import React from 'react';

const Node = ({ node, onClick }) => {
  const getNodeClass = () => {
    if (node.isStart) return 'bg-green-500';
    if (node.isEnd) return 'bg-red-500';
    if (node.isWall) return 'bg-gray-600';
    if (node.isPath) return 'bg-yellow-300';
    if (node.isVisited) return 'bg-blue-300';
    return 'bg-gray-200';
  };

  return (
    <div
      className={`${getNodeClass()} transition-all duration-200 ease-in-out hover:bg-opacity-80 cursor-pointer`}
      onClick={onClick}
      title={
        node.isStart
          ? 'Start Node'
          : node.isEnd
            ? 'End Node'
            : node.isWall
              ? 'Wall'
              : 'Node'
      }
    ></div>
  );
};

export default Node;