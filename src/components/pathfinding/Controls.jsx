import React from 'react';

const Controls = ({
  isVisualizing,
  visualizeAlgorithm,
  resetGrid,
  stopVisualization,
  rows,
  setRows,
  cols,
  setCols,
  visualizationSpeed,
  setVisualizationSpeed,
  algorithm,
  setAlgorithm,
}) => (
  <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center p-4 bg-gray-800 bg-opacity-50 shadow-lg rounded-lg mb-6 space-y-4 sm:space-y-0">
    <div className="flex space-x-2">
      <button
        className="bg-green-500 hover:bg-green-400 active:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 text-white px-4 py-2 rounded-lg font-bold"
        onClick={visualizeAlgorithm}
        disabled={isVisualizing}
      >
        Start
      </button>
      <button
        className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 focus:outline-none focus:ring-2 ${isVisualizing
            ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white focus:ring-blue-300'
          }`}
        onClick={resetGrid}
        disabled={isVisualizing}
      >
        Reset
      </button>
      <button
        className="bg-red-500 hover:bg-red-400 active:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200 text-white px-4 py-2 rounded-lg font-bold"
        onClick={stopVisualization}
        disabled={!isVisualizing}
      >
        Stop
      </button>
    </div>
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="bg-gray-700 text-white rounded-lg px-2 py-1"
        disabled={isVisualizing}
      >
        <option value="dijkstra">Dijkstra&apos;s Algorithm</option>
        <option value="aStar">A* Algorithm</option>
      </select>
      <div className="flex flex-col items-center">
        <label className="font-semibold text-sm">Rows: {rows}</label>
        <input
          type="range"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          min="5"
          max="40"
          className="w-24"
          disabled={isVisualizing}
        />
      </div>
      <div className="flex flex-col items-center">
        <label className="font-semibold text-sm">Columns: {cols}</label>
        <input
          type="range"
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
          min="5"
          max="40"
          className="w-24"
          disabled={isVisualizing}
        />
      </div>
      <div className="flex flex-col items-center">
        <label className="font-semibold text-sm">Delay: {visualizationSpeed}ms</label>
        <input
          type="range"
          value={visualizationSpeed}
          onChange={(e) => setVisualizationSpeed(Number(e.target.value))}
          min="10"
          max="500"
          className="w-24"
          disabled={isVisualizing}
        />
      </div>
    </div>
    <div className="flex items-center space-x-2">
      {isVisualizing ? (
        <p className="text-yellow-300 font-semibold">Visualizing...</p>
      ) : (
        <p className="text-green-300 font-semibold">Ready</p>
      )}
    </div>
  </div>
);

export default Controls;
