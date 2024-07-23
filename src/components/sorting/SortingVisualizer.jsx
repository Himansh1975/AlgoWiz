import React, { useState, useRef, useEffect, useCallback } from 'react';
import ArrayBar from '../common/ArrayBar';
import Controls from '../common/Controls';
import bubbleSort from '../../algorithms/sorting/bubbleSort';
import quickSort from '../../algorithms/sorting/quickSort';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(40);
  const [sortSpeed, setSortSpeed] = useState(50);
  const [activeIndices, setActiveIndices] = useState([]);
  const [pivotIndex, setPivotIndex] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const stopSortingRef = useRef(false);

  const generateRandomArray = useCallback((size = arraySize) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  }, [arraySize]);

  useEffect(() => {
    setArray(generateRandomArray());
  }, [generateRandomArray]);

  const resetArray = () => {
    if (!isSorting) {
      setArray(generateRandomArray());
      setSortedIndices([]);
      setActiveIndices([]);
      setPivotIndex(-1);
    }
  };

  const startSorting = async () => {
    setIsSorting(true);
    stopSortingRef.current = false;
    setSortedIndices([]);
    setActiveIndices([]);
    setPivotIndex(-1);

    if (algorithm === 'bubble') {
      await bubbleSort(array, setArray, setActiveIndices, setSortedIndices, setIsSorting, stopSortingRef, sortSpeed);
    } else if (algorithm === 'quick') {
      await quickSort(array, setArray, setActiveIndices, setSortedIndices, setPivotIndex, setIsSorting, stopSortingRef, sortSpeed);
    }

    setIsSorting(false);
    setActiveIndices([]);
  };

  const stopSorting = () => {
    stopSortingRef.current = true;
    setIsSorting(false);
    setActiveIndices([]);
    setPivotIndex(-1);
  };

  const handleArraySizeChange = (e) => {
    const newSize = Number(e.target.value);
    setArraySize(newSize);
    if (!isSorting) {
      setArray(generateRandomArray(newSize));
      setSortedIndices([]);
      setPivotIndex(-1);
    }
  };

  const handleSortSpeedChange = (e) => {
    setSortSpeed(Number(e.target.value));
  };

  const maxValue = Math.max(...array);
  const barWidth = `calc((100% / ${array.length}) - 2px)`;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6">
      <Controls
        isRunning={isSorting}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        size={arraySize}
        handleSizeChange={handleArraySizeChange}
        speed={sortSpeed}
        handleSpeedChange={handleSortSpeedChange}
        start={startSorting}
        reset={resetArray}
        stop={stopSorting}
      />
      <div className="flex-grow flex items-end justify-center h-[34rem] bg-gray-900 rounded-xl shadow-inner p-6">
        {array.map((value, index) => (
          <ArrayBar
            key={index}
            value={value}
            maxValue={maxValue}
            width={barWidth}
            isActive={activeIndices.includes(index)}
            isPivot={index === pivotIndex}
            isSorted={sortedIndices.includes(index)}
          />
        ))}
      </div>
      <footer className="mt-6 text-center">
        <p>Created with ♥ by Himansh</p>
      </footer>
    </div>
  );
};

export default SortingVisualizer;
