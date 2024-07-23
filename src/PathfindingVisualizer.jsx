import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import 'tailwindcss/tailwind.css';

// Context for managing grid state
const GridContext = createContext();

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(30);
  const [visualizationSpeed, setVisualizationSpeed] = useState(50);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const stopVisualizationRef = useRef(false);
  const gridRef = useRef(null);
  const [cellSize, setCellSize] = useState(20); // Default cell size

  useEffect(() => {
    resetGrid();
  }, [rows, cols]);

  useEffect(() => {
    const updateCellSize = () => {
      if (gridRef.current) {
        const gridWidth = gridRef.current.offsetWidth;
        const gridHeight = gridRef.current.offsetHeight;
        const cellWidth = Math.floor(gridWidth / cols) - 1; // -1 for gap
        const cellHeight = Math.floor(gridHeight / rows) - 1; // -1 for gap
        const newCellSize = Math.min(cellWidth, cellHeight);
        setCellSize(newCellSize);
      }
    };
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [rows, cols]);

  const resetGrid = () => {
    const newGrid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push(createNode(row, col));
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
    setStartNode(null);
    setEndNode(null);
  };

  const createNode = (row, col) => ({
    row,
    col,
    isStart: false,
    isEnd: false,
    isWall: false,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
    isPath: false,
  });

  const handleNodeClick = (row, col) => {
    if (isVisualizing) return;

    const newGrid = [...grid];
    const node = newGrid[row][col];

    if (!startNode) {
      node.isStart = true;
      setStartNode({ row, col });
    } else if (!endNode && !node.isStart) {
      node.isEnd = true;
      setEndNode({ row, col });
    } else if (!node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
    }

    setGrid(newGrid);
  };

  const visualizeDijkstra = async () => {
    if (!startNode || !endNode) return;

    setIsVisualizing(true);
    stopVisualizationRef.current = false;

    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        distance: node.isStart ? 0 : Infinity,
        isVisited: false,
        previousNode: null,
        isPath: false,
      }))
    );

    const startNodeObj = newGrid[startNode.row][startNode.col];
    const endNodeObj = newGrid[endNode.row][endNode.col];

    const visitedNodesInOrder = [];
    const unvisitedNodes = newGrid.flat();

    while (unvisitedNodes.length) {
      if (stopVisualizationRef.current) {
        setIsVisualizing(false);
        return;
      }

      unvisitedNodes.sort((a, b) => a.distance - b.distance);
      const closestNode = unvisitedNodes.shift();

      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) break;

      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);

      if (closestNode === endNodeObj) {
        await animatePath(visitedNodesInOrder, getNodesInShortestPath(endNodeObj));
        setIsVisualizing(false);
        return;
      }

      updateUnvisitedNeighbors(closestNode, newGrid);
    }

    setIsVisualizing(false);
  };

  const updateUnvisitedNeighbors = (node, grid) => {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  };

  const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
  };

  const getNodesInShortestPath = endNode => {
    const nodesInShortestPath = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      nodesInShortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPath;
  };

  const animatePath = async (visitedNodesInOrder, nodesInShortestPath) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        await animateShortestPath(nodesInShortestPath);
        return;
      }
      const node = visitedNodesInOrder[i];
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        const newNode = { ...newGrid[node.row][node.col], isVisited: true };
        newGrid[node.row][node.col] = newNode;
        return newGrid;
      });
      await new Promise(resolve => setTimeout(resolve, visualizationSpeed));
    }
  };

  const animateShortestPath = async nodesInShortestPath => {
    for (let i = 0; i < nodesInShortestPath.length; i++) {
      const node = nodesInShortestPath[i];
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        const newNode = { ...newGrid[node.row][node.col], isPath: true };
        newGrid[node.row][node.col] = newNode;
        return newGrid;
      });
      await new Promise(resolve => setTimeout(resolve, visualizationSpeed * 2));
    }
  };

  const stopVisualization = () => {
    stopVisualizationRef.current = true;
  };

  return (
    <GridContext.Provider value={{ grid, handleNodeClick }}>
      <div className="h-screen flex flex-col text-white bg-gray-900">
        <Controls
          isVisualizing={isVisualizing}
          visualizeDijkstra={visualizeDijkstra}
          resetGrid={resetGrid}
          stopVisualization={stopVisualization}
          rows={rows}
          setRows={setRows}
          cols={cols}
          setCols={setCols}
          visualizationSpeed={visualizationSpeed}
          setVisualizationSpeed={setVisualizationSpeed}
        />
        <Grid gridSize={{ rows, cols }} cellSize={cellSize} gridRef={gridRef} />
      </div>
    </GridContext.Provider>
  );
};

const Controls = ({
  isVisualizing,
  visualizeDijkstra,
  resetGrid,
  stopVisualization,
  rows,
  setRows,
  cols,
  setCols,
  visualizationSpeed,
  setVisualizationSpeed,
}) => (
  <div className="flex justify-between items-center p-2 bg-gray-800 shadow-lg rounded-lg m-4">
    <div className="flex space-x-2">
      <button
        className="bg-green-500 hover:bg-green-400 active:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 text-white px-2 py-1 rounded-lg font-bold text-xs"
        onClick={visualizeDijkstra}
        disabled={isVisualizing}
      >
        Start
      </button>
      <button
        className={`px-2 py-1 rounded-lg font-bold transition-all duration-200 focus:outline-none focus:ring-2 text-xs ${isVisualizing
          ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white focus:ring-blue-300'
          }`}
        onClick={resetGrid}
        disabled={isVisualizing}
      >
        Reset
      </button>
      <button
        className="bg-red-500 hover:bg-red-400 active:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200 text-white px-2 py-1 rounded-lg font-bold text-xs"
        onClick={stopVisualization}
        disabled={!isVisualizing}
      >
        Stop
      </button>
    </div>
    <div className="flex items-center space-x-2 text-xs">
      {isVisualizing ? (
        <p className="text-yellow-300 font-semibold">Visualizing...</p>
      ) : (
        <p className="text-green-300 font-semibold">Idle</p>
      )}
    </div>
    <div className="flex space-x-4 items-center">
      <div className="flex flex-col items-center">
        <label className="font-semibold text-xs">Rows: {rows}</label>
        <input
          type="range"
          value={rows}
          onChange={e => setRows(Number(e.target.value))}
          min="5"
          max="50"
          className="w-20"
          disabled={isVisualizing}
        />
      </div>
      <div className="flex flex-col items-center">
        <label className="font-semibold text-xs">Columns: {cols}</label>
        <input
          type="range"
          value={cols}
          onChange={e => setCols(Number(e.target.value))}
          min="5"
          max="50"
          className="w-20"
          disabled={isVisualizing}
        />
      </div>
      <div className="flex flex-col items-center">
        <label className="font-semibold text-xs">Delay: {visualizationSpeed}ms</label>
        <input
          type="range"
          value={visualizationSpeed}
          onChange={e => setVisualizationSpeed(Number(e.target.value))}
          min="10"
          max="500"
          className="w-20"
          disabled={isVisualizing}
        />
      </div>
    </div>
  </div>
);

const Grid = ({ gridSize, cellSize, gridRef }) => {
  const { grid, handleNodeClick } = useContext(GridContext);
  const { rows, cols } = gridSize;

  return (
    <div className="flex-grow flex justify-center items-center overflow-hidden p-2" ref={gridRef}>
      <div
        className="grid gap-[1px] border border-gray-700"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((node, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${node.isStart
                ? 'bg-green-500'
                : node.isEnd
                  ? 'bg-red-500'
                  : node.isWall
                    ? 'bg-gray-600'
                    : node.isPath
                      ? 'bg-yellow-300'
                      : node.isVisited
                        ? 'bg-blue-300'
                        : 'bg-gray-200'
                } transition-all duration-200 ease-in-out hover:bg-gray-400 cursor-pointer`}
              onClick={() => handleNodeClick(rowIndex, colIndex)}
              title={node.isStart ? 'Start Node' : node.isEnd ? 'End Node' : node.isWall ? 'Wall' : 'Node'}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
