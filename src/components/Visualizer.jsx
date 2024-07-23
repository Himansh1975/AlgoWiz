import React, { useState, useRef, useEffect, useCallback } from 'react';
import 'tailwindcss/tailwind.css';

const Visualizer = () => {
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

  const bubbleSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopSortingRef.current) return;
        setActiveIndices([j, j + 1]);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
        await new Promise((r) => setTimeout(r, sortSpeed));
      }
      setSortedIndices((prev) => [...prev, arr.length - i - 1]);
    }
    setSortedIndices([...Array(arr.length).keys()]);
  };

  const quickSort = async (arr, left = 0, right = arr.length - 1) => {
    if (left < right) {
      const pivotIndex = await partition(arr, left, right);
      await quickSort(arr, left, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, right);
    }
    if (left === 0 && right === arr.length - 1) {
      setSortedIndices([...Array(arr.length).keys()]);
    }
    return arr;
  };

  const partition = async (arr, left, right) => {
    const pivot = arr[right];
    setPivotIndex(right);
    let i = left - 1;

    for (let j = left; j < right; j++) {
      if (stopSortingRef.current) return;
      setActiveIndices([j, i + 1]);
      await new Promise((r) => setTimeout(r, sortSpeed));
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
      }
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    setArray([...arr]);
    await new Promise((r) => setTimeout(r, sortSpeed));
    setPivotIndex(-1);
    setSortedIndices((prev) => [...prev, i + 1]);
    return i + 1;
  };

  const startSorting = async () => {
    setIsSorting(true);
    stopSortingRef.current = false;
    setSortedIndices([]);
    setActiveIndices([]);
    setPivotIndex(-1);

    if (algorithm === 'bubble') {
      await bubbleSort();
    } else if (algorithm === 'quick') {
      await quickSort([...array]);
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
      <div className="flex flex-wrap justify-between items-center mb-8 bg-gray-900 p-6 rounded-xl shadow-2xl">
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <button
            className="bg-green-600 hover:bg-green-500 active:bg-green-700 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300"
            onClick={startSorting}
            disabled={isSorting}
          >
            Start
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${isSorting
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 active:bg-blue-700"
              }`}
            onClick={resetArray}
            disabled={isSorting}
          >
            Reset
          </button>
          <button
            className="bg-red-600 hover:bg-red-500 active:bg-red-700 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300"
            onClick={stopSorting}
            disabled={!isSorting}
          >
            Stop
          </button>
        </div>
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <label className="font-semibold text-sm">Algorithm:</label>
          <select
            className="bg-gray-800 rounded-md px-4 py-2 text-sm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isSorting}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
        </div>
        <div className="flex space-x-6 items-center">
          <div className="flex flex-col items-center">
            <label className="font-semibold text-sm mb-2">Array Size: {arraySize}</label>
            <input
              type="range"
              value={arraySize}
              onChange={handleArraySizeChange}
              min="10"
              max="100"
              className="w-40"
              disabled={isSorting}
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="font-semibold text-sm mb-2">Delay: {sortSpeed}ms</label>
            <input
              type="range"
              value={sortSpeed}
              onChange={handleSortSpeedChange}
              min="20"
              max="200"
              className="w-40"
              disabled={isSorting}
            />
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-end justify-center h-[34rem] bg-gray-900 rounded-xl shadow-inner p-6">
        {array.map((value, index) => (
          <div
            key={index}
            className={`transition-all duration-150 ease-in-out ${sortedIndices.includes(index)
              ? "bg-green-400 shadow-md"
              : index === pivotIndex
                ? "bg-purple-400 shadow-md"
                : activeIndices.includes(index)
                  ? "bg-yellow-400 shadow-md"
                  : "bg-blue-400 shadow-md"
              } rounded-sm`}
            style={{
              height: `${(value / maxValue) * 100}%`,
              width: barWidth,
              margin: '0 2px',
            }}
          ></div>
        ))}
      </div>
      <footer className="mt-6 text-center">
        <p>Created with ♥ by Himansh</p>
      </footer>
    </div>
  );
};

export default Visualizer;
