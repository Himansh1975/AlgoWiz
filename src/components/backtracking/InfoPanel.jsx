import React, { useState } from 'react';
import { FaChessQueen, FaStepForward, FaInfoCircle } from 'react-icons/fa';

const InfoPanel = ({ stepCount, currentStep, solutions, boardSize, onSolutionSelect, selectedSolution }) => {
  const [activeTab, setActiveTab] = useState('status');

  const tabs = [
    { id: 'status', label: 'Status', icon: <FaStepForward /> },
    { id: 'solutions', label: 'Solutions', icon: <FaChessQueen /> },
    { id: 'info', label: 'Info', icon: <FaInfoCircle /> },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-800 rounded-lg shadow-lg">
      <div className="bg-gray-900 rounded-t-lg p-4">
        <h2 className="text-2xl font-bold text-indigo-300">N-Queens Solver</h2>
        <p className="text-gray-400">Board Size: {boardSize}x{boardSize}</p>
      </div>

      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-2 px-4 focus:outline-none transition-colors duration-200 ${activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:bg-gray-700'
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex items-center justify-center">
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex-grow overflow-auto p-4">
        {activeTab === 'status' && (
          <div>
            <div className="mb-4 bg-gray-700 rounded-lg p-3">
              <h3 className="text-lg font-semibold mb-2 text-indigo-300">Progress</h3>
              <p className="text-gray-300">Step Count: {stepCount}</p>
              <p className="text-gray-300">Current Step: {currentStep}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <h3 className="text-lg font-semibold mb-2 text-indigo-300">Statistics</h3>
              <p className="text-gray-300">Solutions Found: {solutions.length}</p>
              <p className="text-gray-300">Completion: {stepCount > 0 ? Math.min(100, Math.floor((stepCount / (boardSize * boardSize)) * 100)) : 0}%</p>
            </div>
          </div>
        )}

        {activeTab === 'solutions' && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-indigo-300">Solutions ({solutions.length})</h3>
            {solutions.length > 0 ? (
              <ul className="space-y-2">
                {solutions.map((solution, index) => (
                  <li
                    key={index}
                    className={`bg-gray-700 rounded-lg p-2 cursor-pointer transition-colors duration-200 ${JSON.stringify(solution) === JSON.stringify(selectedSolution)
                        ? 'border-2 border-indigo-500'
                        : 'hover:bg-gray-600'
                      }`}
                    onClick={() => onSolutionSelect(solution)}
                  >
                    <p className="text-gray-300">Solution {index + 1}: {JSON.stringify(solution)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No solutions found yet.</p>
            )}
          </div>
        )}

        {activeTab === 'info' && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-indigo-300">About N-Queens</h3>
            <p className="text-gray-300 mb-2">
              The N-Queens puzzle is the problem of placing N chess queens on an N×N chessboard so that no two queens threaten each other.
            </p>
            <h4 className="text-md font-semibold mb-2 text-indigo-300">Solving Strategy</h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Place queens one by one in different columns</li>
              <li>Check if a queen can be placed in the current column</li>
              <li>If yes, mark this as a solution and backtrack</li>
              <li>If no, backtrack and try other rows</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;