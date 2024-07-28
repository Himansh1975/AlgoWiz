import React from 'react';
import { FaPlay, FaStop, FaRedo, FaChartBar } from 'react-icons/fa';


const Controls = ({ isRunning, algorithm, setAlgorithm, size, handleSizeChange, speed, handleSpeedChange, start, reset, stop }) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center mb-5 bg-gray-900 p-6 rounded-xl shadow-2xl space-y-4 sm:space-y-0">
      <div className="flex justify-center sm:justify-start space-x-4 mb-4 sm:mb-0">
        <ControlButton icon={<FaPlay />} label="Start" onClick={start} disabled={isRunning} color="green" />
        <ControlButton icon={<FaStop />} label="Stop" onClick={stop} disabled={!isRunning} color="red" />
        <ControlButton icon={<FaRedo />} label="Reset" onClick={reset} disabled={isRunning} color="blue" />
      </div>
      <div className="flex items-center space-x-2">
        <FaChartBar className="text-indigo-400" />
        <select
          className="bg-gray-800 text-white py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isRunning}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="quick">Quick Sort</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex flex-col items-center">
          <label className="font-semibold text-sm mb-2">Size: {size}</label>
          <input
            type="range"
            value={size}
            onChange={handleSizeChange}
            min="10"
            max="100"
            className="w-40 outline-none transition-all duration-300"
            disabled={isRunning}
            title="Array Size"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="font-semibold text-sm mb-2">Delay: {speed}ms</label>
          <input
            type="range"
            value={speed}
            onChange={handleSpeedChange}
            min="10"
            max="200"
            className="w-40 outline-none transition-all duration-300"
            disabled={isRunning}
            title="Visualization Speed"
          />
        </div>
      </div>
    </div>
  );
};

const ControlButton = ({ icon, label, onClick, disabled, color }) => {
  const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800";
  const colorClasses = {
    green: "bg-green-600 hover:bg-green-500 active:bg-green-700 focus:ring-green-500",
    red: "bg-red-600 hover:bg-red-500 active:bg-red-700 focus:ring-red-500",
    blue: "bg-blue-600 hover:bg-blue-500 active:bg-blue-700 focus:ring-blue-500"
  };

  return (
    <button
      className={`${baseClasses} ${colorClasses[color]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Controls;
