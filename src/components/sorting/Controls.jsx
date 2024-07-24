import React from 'react';

const Controls = ({ isRunning, algorithm, setAlgorithm, size, handleSizeChange, speed, handleSpeedChange, start, reset, stop }) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center mb-8 bg-gray-900 p-6 rounded-xl shadow-2xl space-y-4 sm:space-y-0">
      <div className="flex justify-center sm:justify-start space-x-4 mb-4 sm:mb-0">
        <button
          className={`bg-green-600 hover:bg-green-500 active:bg-green-700 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={start}
          disabled={isRunning}
          title="Start"
        >
          Start
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${isRunning ? 'bg-gray-600 text-gray-300 cursor-not-allowed opacity-50' : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white'}`}
          onClick={reset}
          disabled={isRunning}
          title="Reset"
        >
          Reset
        </button>
        <button
          className={`bg-red-600 hover:bg-red-500 active:bg-red-700 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${!isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={stop}
          disabled={!isRunning}
          title="Stop"
        >
          Stop
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <label className="font-semibold text-sm">Algorithm:</label>
        <div className="relative inline-block w-40">
          <select
            className="appearance-none w-full bg-gray-800 border border-gray-700 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isRunning}
            title="Select Algorithm"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="quick">Quick Sort</option>
            {/* Add more options as needed */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z" /></svg>
          </div>
        </div>
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
            className="w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
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
            className="w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            disabled={isRunning}
            title="Visualization Speed"
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
