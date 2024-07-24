import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import 'tailwindcss/tailwind.css';

const GridContext = createContext();

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(30);
  const [visualizationSpeed, setVisualizationSpeed] = useState(50);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [algorithm, setAlgorithm] = useState('dijkstra');
  const stopVisualizationRef = useRef(false);
  const gridRef = useRef(null);
  const [cellSize, setCellSize] = useState(20);

  useEffect(() => {
    resetGrid();
  }, [rows, cols]);

  useEffect(() => {
    const updateCellSize = () => {
      if (gridRef.current) {
        const gridWidth = gridRef.current.offsetWidth;
        const gridHeight = gridRef.current.offsetHeight;
        const cellWidth = Math.floor(gridWidth / cols) - 1;
        const cellHeight = Math.floor(gridHeight / rows) - 1;
        const newCellSize = Math.min(cellWidth, cellHeight, 30);
        setCellSize(newCellSize);
      }
    };
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [rows, cols]);

  const resetGrid = () => {
    const newGrid = Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols }, (_, col) => createNode(row, col))
    );
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

  const visualizeAlgorithm = async () => {
    if (!startNode || !endNode) {
      alert("Please set both start and end nodes before visualizing.");
      return;
    }

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

    let visitedNodesInOrder;
    switch (algorithm) {
      case 'dijkstra':
        visitedNodesInOrder = dijkstra(newGrid, startNodeObj, endNodeObj);
        break;
      case 'aStar':
        visitedNodesInOrder = aStar(newGrid, startNodeObj, endNodeObj);
        break;
      default:
        visitedNodesInOrder = dijkstra(newGrid, startNodeObj, endNodeObj);
    }

    const nodesInShortestPath = getNodesInShortestPath(endNodeObj);
    await animatePath(visitedNodesInOrder, nodesInShortestPath);

    setIsVisualizing(false);
  };

  const dijkstra = (grid, startNode, endNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = grid.flat();

    while (unvisitedNodes.length) {
      if (stopVisualizationRef.current) return visitedNodesInOrder;

      unvisitedNodes.sort((a, b) => a.distance - b.distance);
      const closestNode = unvisitedNodes.shift();

      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;

      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);

      if (closestNode === endNode) return visitedNodesInOrder;

      updateUnvisitedNeighbors(closestNode, grid);
    }

    return visitedNodesInOrder;
  };

  const aStar = (grid, startNode, endNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.heuristic = manhattanDistance(startNode, endNode);
    startNode.totalDistance = startNode.distance + startNode.heuristic;
    const unvisitedNodes = [startNode];

    while (unvisitedNodes.length) {
      if (stopVisualizationRef.current) return visitedNodesInOrder;

      unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
      const closestNode = unvisitedNodes.shift();

      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;

      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);

      if (closestNode === endNode) return visitedNodesInOrder;

      const neighbors = getNeighbors(closestNode, grid);
      for (const neighbor of neighbors) {
        const tentativeDistance = closestNode.distance + 1;

        if (tentativeDistance < neighbor.distance) {
          neighbor.previousNode = closestNode;
          neighbor.distance = tentativeDistance;
          neighbor.heuristic = manhattanDistance(neighbor, endNode);
          neighbor.totalDistance = neighbor.distance + neighbor.heuristic;

          if (!unvisitedNodes.includes(neighbor)) {
            unvisitedNodes.push(neighbor);
          }
        }
      }
    }

    return visitedNodesInOrder;
  };

  const manhattanDistance = (nodeA, nodeB) => {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
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

  const getNodesInShortestPath = (endNode) => {
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

  const animateShortestPath = async (nodesInShortestPath) => {
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
      <div className="min-h-screen flex flex-col text-white bg-gradient-to-br from-gray-900 to-blue-900">
        <h1 className="text-3xl font-bold text-center py-4 bg-opacity-50 bg-black">Pathfinding Visualizer</h1>
        <Controls
          isVisualizing={isVisualizing}
          visualizeAlgorithm={visualizeAlgorithm}
          resetGrid={resetGrid}
          stopVisualization={stopVisualization}
          rows={rows}
          setRows={setRows}
          cols={cols}
          setCols={setCols}
          visualizationSpeed={visualizationSpeed}
          setVisualizationSpeed={setVisualizationSpeed}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
        />
        <Grid gridSize={{ rows, cols }} cellSize={cellSize} gridRef={gridRef} />
        <Legend />
      </div>
    </GridContext.Provider>
  );
};

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
  <div className="flex flex-wrap justify-center items-center p-4 bg-gray-800 bg-opacity-50 shadow-lg rounded-lg m-4 space-y-2 md:space-y-0">
    <div className="flex space-x-2 w-full md:w-auto justify-center">
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
    <div className="flex items-center space-x-2 w-full md:w-auto justify-center">
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="bg-gray-700 text-white rounded-lg px-2 py-1"
        disabled={isVisualizing}
      >
        <option value="dijkstra">Dijkstra's Algorithm</option>
        <option value="aStar">A* Algorithm</option>
      </select>
    </div>
    <div className="flex space-x-4 items-center w-full md:w-auto justify-center">
      <div className="flex flex-col items-center">
        <label className="font-semibold">Rows: {rows}</label>
        <input
          type="range"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          min="5"
          max="50"
          className="w-24"
          disabled={isVisualizing}
        />
      </div>
      <div className="flex flex-col items-center">
        <label className="font-semibold">Columns: {cols}</label>
        <input
          type="range"
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
          min="5"
          max="50"
          className="w-24"
          disabled={isVisualizing}
        />
      </div>
      <div className="flex flex-col items-center">
        <label className="font-semibold">Delay: {visualizationSpeed}ms</label>
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
    <div className="flex items-center space-x-2 w-full md:w-auto justify-center">
      {isVisualizing ? (
        <p className="text-yellow-300 font-semibold">Visualizing...</p>
      ) : (
        <p className="text-green-300 font-semibold">Ready</p>
      )}
    </div>
  </div>
);

const Grid = ({ gridSize, cellSize, gridRef }) => {
  const { grid, handleNodeClick } = useContext(GridContext);
  const { rows, cols } = gridSize;

  return (
    <div className="flex-grow flex justify-center items-center overflow-auto p-2" ref={gridRef}>
      <div
        className="grid gap-[1px] border border-gray-700 bg-opacity-50 bg-gray-800 p-2 rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((node, colIndex) => (
            <Node
              key={`${rowIndex}-${colIndex}`}
              node={node}
              onClick={() => handleNodeClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const Node = ({ node, onClick }) => {
  const getNodeClass = () => {
    if (node.isStart) return 'bg-green-500';
    if (node.isEnd) return 'bg-red-500';
    if (node.isWall) return 'bg-gray-600';
    if (node.isPath) return 'bg-yellow-300';
    if (node.isVisited) return 'bg-blue-300';
    return 'bg-gray-200';
  };

  return (
    <div
      className={`${getNodeClass()} transition-all duration-200 ease-in-out hover:bg-opacity-80 cursor-pointer`}
      onClick={onClick}
      title={
        node.isStart
          ? 'Start Node'
          : node.isEnd
            ? 'End Node'
            : node.isWall
              ? 'Wall'
              : 'Node'
      }
    ></div>
  );
};

const Legend = () => (
  <div className="flex justify-center items-center p-4 bg-gray-800 bg-opacity-50 mt-4">
    <div className="flex space-x-4">
      <LegendItem color="bg-green-500" label="Start Node" />
      <LegendItem color="bg-red-500" label="End Node" />
      <LegendItem color="bg-gray-600" label="Wall" />
      <LegendItem color="bg-blue-300" label="Visited Node" />
      <LegendItem color="bg-yellow-300" label="Shortest Path" />
    </div>
  </div>
);

const LegendItem = ({ color, label }) => (
  <div className="flex items-center">
    <div className={`w-4 h-4 ${color} rounded-sm mr-2`}></div>
    <span className="text-sm">{label}</span>
  </div>
);

export default PathfindingVisualizer;