import React from 'react';
import { FaPlay, FaStop, FaRedo, FaRoute, FaChartBar, FaColumns, FaRulerHorizontal, FaSpinner } from 'react-icons/fa';

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
  <div className="flex flex-col space-y-6 bg-gray-900 p-6 rounded-xl shadow-2xl mb-5">
    <div className="flex flex-wrap justify-between items-center space-y-4 sm:space-y-0">
      <div className="flex space-x-4">
        <ControlButton
          icon={<FaPlay />}
          label="Start"
          onClick={visualizeAlgorithm}
          disabled={isVisualizing}
          color="green"
        />
        <ControlButton
          icon={<FaStop />}
          label="Stop"
          onClick={stopVisualization}
          disabled={!isVisualizing}
          color="red"
        />
        <ControlButton
          icon={<FaRedo />}
          label="Reset"
          onClick={resetGrid}
          disabled={isVisualizing}
          color="blue"
        />
      </div>
      <div className="flex-grow flex justify-center items-center relative md:right-9">
        {isVisualizing ? (
          <div className="flex items-center space-x-2 text-yellow-300 font-semibold">
            <FaSpinner className="animate-spin" />
            <span>Visualizing algorithm...</span>
          </div>
        ) : (
          <p className="text-green-300 font-semibold">Ready to visualize</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <FaRoute className="text-indigo-400" />
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="bg-gray-800 text-white py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          disabled={isVisualizing}
        >
          <option value="dijkstra">Dijkstra&apos;s Algorithm</option>
          <option value="aStar">A* Algorithm</option>
        </select>
      </div>
    </div>

    <div className="flex flex-wrap justify-between items-center space-y-4 sm:space-y-0">
      <ControlSlider
        icon={<FaRulerHorizontal />}
        label="Rows"
        value={rows}
        onChange={(e) => setRows(Number(e.target.value))}
        min={5}
        max={40}
        disabled={isVisualizing}
      />
      <ControlSlider
        icon={<FaColumns />}
        label="Columns"
        value={cols}
        onChange={(e) => setCols(Number(e.target.value))}
        min={5}
        max={40}
        disabled={isVisualizing}
      />
      <ControlSlider
        icon={<FaChartBar />}
        label="Delay"
        value={visualizationSpeed}
        onChange={(e) => setVisualizationSpeed(Number(e.target.value))}
        min={10}
        max={500}
        disabled={isVisualizing}
        unit="ms"
      />
    </div>
  </div>
);

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

const ControlSlider = ({ icon, label, value, onChange, min, max, disabled, unit = '' }) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center space-x-2 mb-2">
      {icon}
      <label className="font-semibold text-sm">{label}: {value}{unit}</label>
    </div>
    <input
      type="range"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className="w-40 outline-none transition-all duration-300"
      disabled={disabled}
    />
  </div>
);

export default Controls;