import React from 'react';

const ArrayBar = ({ value, maxValue, width, isActive, isPivot, isSorted }) => {
  const barColor = isSorted
    ? 'bg-green-400'
    : isPivot
    ? 'bg-purple-400'
    : isActive
    ? 'bg-yellow-400'
    : 'bg-blue-400';

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${barColor} shadow-md rounded-sm`}
      style={{
        height: `${(value / maxValue) * 100}%`,
        width,
        margin: '0 2px',
      }}
    ></div>
  );
};

export default ArrayBar;
