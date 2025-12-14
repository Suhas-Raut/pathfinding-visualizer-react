import React, { useState, useEffect } from "react";
import Node from "./Node";
import { createGrid } from "../utils/grid";
import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { dijkstra } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { greedy } from "../algorithms/greedy";
import { animate, animateMaze } from "../utils/animate";
import { recursiveDivision } from "../algorithms/recursiveDivision";

const ROWS = 20;
const COLS = 58;

export default function Board() {
  const [grid, setGrid] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [draggingNode, setDraggingNode] = useState(null); // "start" | "end" | null
  const [startPos, setStartPos] = useState({ row: 5, col: 5 });
  const [endPos, setEndPos] = useState({ row: 10, col: 30 });
  const [selectedAlgo, setSelectedAlgo] = useState("bfs");

  // Initialize grid
  useEffect(() => {
    clearBoard();
  }, []);

  // --- Mouse handlers for walls and draggable nodes ---
  const handleMouseDown = (node) => {
    if (node.isStart) setDraggingNode("start");
    else if (node.isEnd) setDraggingNode("end");
    else {
      toggleWall(node);
    }
    setMouseDown(true);
  };

  const handleMouseEnter = (node) => {
    if (!mouseDown) return;

    if (draggingNode === "start") moveNode("start", node);
    else if (draggingNode === "end") moveNode("end", node);
    else toggleWall(node);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setDraggingNode(null);
  };

  const toggleWall = (node) => {
    if (!node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
      setGrid([...grid]);
    }
  };

  const moveNode = (type, node) => {
    if (node.isWall) return; // prevent moving onto a wall

    setGrid((prev) => {
      const copy = prev.map(row => row.map(n => ({ ...n })));

      if (type === "start") {
        copy[startPos.row][startPos.col].isStart = false;
        copy[node.row][node.col].isStart = true;
        setStartPos({ row: node.row, col: node.col });
      } else {
        copy[endPos.row][endPos.col].isEnd = false;
        copy[node.row][node.col].isEnd = true;
        setEndPos({ row: node.row, col: node.col });
      }

      return copy;
    });
  };

  // --- Clear Board ---
  const clearBoard = () => {
    const newGrid = createGrid(ROWS, COLS).map(row =>
      row.map((n) => ({
        ...n,
        isStart: false,
        isEnd: false,
        isWall: false,
        isVisited: false,
        isPath: false,
      }))
    );

    newGrid[startPos.row][startPos.col].isStart = true;
    newGrid[endPos.row][endPos.col].isEnd = true;

    setGrid(newGrid);
  };

  // --- Visualize Algorithm ---
 const visualizeAlgorithm = () => {
  // Reset only visited and path, keep walls
  const newGrid = grid.map(row =>
    row.map(n => ({ ...n, isVisited: false, isPath: false }))
  );

  // ✅ GET START & END FROM newGrid (NOT grid)
  const startNode = newGrid[startPos.row][startPos.col];
  const endNode = newGrid[endPos.row][endPos.col];

  setGrid(newGrid);

  if (!startNode || !endNode) {
    console.error("Start or End node undefined");
    return;
  }

  let result;
  switch (selectedAlgo) {
    case "bfs":
      result = bfs(newGrid, startNode, endNode);
      break;
    case "dfs":
      result = dfs(newGrid, startNode, endNode);
      break;
    case "dijkstra":
      result = dijkstra(newGrid, startNode, endNode);
      break;
    case "astar":
      result = astar(newGrid, startNode, endNode);
      break;
    case "greedy":
      result = greedy(newGrid, startNode, endNode);
      break;
    default:
      result = bfs(newGrid, startNode, endNode);
  }

  // 🛡️ Defensive guard
  if (!result || !result.visited) return;

  animate(result.visited, result.path || [], setGrid);
};


  // --- Generate Maze ---
  const generateMaze = () => {
    clearBoard(); // Maze only on clear board
    const walls = recursiveDivision(grid);
    animateMaze(walls, setGrid);
  };

  return (
    <div>
      <div className="panel">
        <select onChange={(e) => setSelectedAlgo(e.target.value)} value={selectedAlgo}>
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A*</option>
          <option value="greedy">Greedy</option>
        </select>

        <button onClick={visualizeAlgorithm}>Visualize</button>
        <button onClick={generateMaze}>Generate Maze</button>
        <button onClick={clearBoard}>Clear Board</button>
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${COLS}, 25px)` }}
      >
        {grid.map(row =>
          row.map(node => (
            <Node
              key={node.id}
              node={node}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseUp={handleMouseUp}
            />
          ))
        )}
      </div>
    </div>
  );
}
