import React, { useState, useRef, useEffect } from 'react';
import Grid from './Grid';
import Controls from './Controls';
import Legend from './Legend';
import { dijkstra, aStar } from '../../algorithms/pathfinding';

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [visualizationSpeed, setVisualizationSpeed] = useState(50);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [algorithm, setAlgorithm] = useState('dijkstra');
  const stopVisualizationRef = useRef(false);
  const gridRef = useRef(null);
  const [cellSize, setCellSize] = useState(60);

  useEffect(() => {
    resetGrid();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, cols]);

  useEffect(() => {
    const updateCellSize = () => {
      if (gridRef.current) {
        const gridWidth = gridRef.current.offsetWidth;
        const gridHeight = gridRef.current.offsetHeight;
        const cellWidth = Math.floor(gridWidth / cols) - 1;
        const cellHeight = Math.floor(gridHeight / rows) - 1;
        const newCellSize = Math.min(cellWidth, cellHeight, 80);
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
    if (algorithm === 'dijkstra') {
      visitedNodesInOrder = dijkstra(newGrid, startNodeObj, endNodeObj);
    } else if (algorithm === 'aStar') {
      visitedNodesInOrder = aStar(newGrid, startNodeObj, endNodeObj);
    }

    await animatePath(visitedNodesInOrder);

    setIsVisualizing(false);
  };

  const animatePath = async (visitedNodesInOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (stopVisualizationRef.current) {
        setIsVisualizing(false);
        return;
      }

      if (i === visitedNodesInOrder.length) {
        const nodesInShortestPath = getNodesInShortestPath(visitedNodesInOrder[visitedNodesInOrder.length - 1]);
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
      if (stopVisualizationRef.current) {
        setIsVisualizing(false);
        return;
      }

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

  const getNodesInShortestPath = (endNode) => {
    const nodesInShortestPath = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      nodesInShortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPath;
  };

  const stopVisualization = () => {
    stopVisualizationRef.current = true;
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-5">
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
      <Grid 
        grid={grid}
        handleNodeClick={handleNodeClick}
        cellSize={cellSize}
        gridRef={gridRef}
      />
      <Legend />
      <footer className="mt-6 text-center">
        <p>Created with ♥ by Himansh</p>
      </footer>
    </div>
  );
};

export default PathfindingVisualizer;