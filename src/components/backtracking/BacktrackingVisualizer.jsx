import React, { useState, useRef, useCallback, useEffect } from 'react';
import ChessBoard from './ChessBoard';
import Controls from './Controls';
import InfoPanel from './InfoPanel';
import nQueens from '../../algorithms/backtracking/nQueens';

const BacktrackingVisualizer = () => {
  const [boardSize, setBoardSize] = useState(4);
  const [board, setBoard] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [stepCount, setStepCount] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [solutions, setSolutions] = useState([]);
  const stopVisualizationRef = useRef(false);

  const [selectedSolution, setSelectedSolution] = useState(null);

  const initializeBoard = useCallback(() => {
    return Array(boardSize).fill().map(() => Array(boardSize).fill(0));
  }, [boardSize]);

  useEffect(() => {
    setBoard(initializeBoard());
  }, [initializeBoard]);

  const resetBoard = () => {
    if (!isRunning) {
      setBoard(initializeBoard());
      setStepCount(0);
      setCurrentStep('');
      setSolutions([]);
    }
  };

  const startVisualization = async () => {
    setIsRunning(true);
    stopVisualizationRef.current = false;
    setStepCount(0);
    setCurrentStep('Starting N-Queens solver...');
    setSolutions([]);

    const foundSolutions = await nQueens(
      boardSize,
      setBoard,
      setCurrentStep,
      setStepCount,
      setIsRunning,
      stopVisualizationRef,
      speed
    );

    setSolutions(foundSolutions);
    setIsRunning(false);
  };

  const stopVisualization = () => {
    stopVisualizationRef.current = true;
    setIsRunning(false);
  };

  const handleBoardSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setBoardSize(newSize);
    if (!isRunning) {
      setBoard(Array(newSize).fill().map(() => Array(newSize).fill(0)));
      setStepCount(0);
      setCurrentStep('');
      setSolutions([]);
    }
  };

  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  const handleSolutionSelect = (solution) => {
    const newBoard = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
    solution.forEach((col, row) => {
      newBoard[row][col] = 1;
    });
    setBoard(newBoard);
    setSelectedSolution(solution);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4">
      <Controls
        isRunning={isRunning}
        boardSize={boardSize}
        handleBoardSizeChange={handleBoardSizeChange}
        speed={speed}
        handleSpeedChange={handleSpeedChange}
        start={startVisualization}
        reset={resetBoard}
        stop={stopVisualization}
      />
      <div className="flex-grow flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 overflow-hidden">
        <div className="w-full md:w-2/3 bg-gray-900 rounded-xl shadow-inner p-4 flex items-center justify-center">
          <ChessBoard board={board} />
        </div>
        <div className="w-full md:w-1/3 bg-gray-900 rounded-xl shadow-inner p-4 overflow-auto">
          <InfoPanel
            stepCount={stepCount}
            currentStep={currentStep}
            solutions={solutions}
            boardSize={boardSize}
            onSolutionSelect={handleSolutionSelect}
            selectedSolution={selectedSolution}
          />
        </div>
      </div>
      <footer className="mt-2 text-center">
        <p>Created with ♥ by Himansh</p>
      </footer>
    </div>
  );
};

export default BacktrackingVisualizer;