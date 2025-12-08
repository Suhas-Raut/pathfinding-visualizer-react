import React, { useState, useEffect } from "react";
import Node from "./Node";
import { createGrid } from "../utils/grid";
import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { dijkstra } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { greedy } from "../algorithms/greedy";
import { animate } from "../utils/animate";
import { recursiveDivision } from "../algorithms/recursiveDivision";
import { animateMaze } from "../utils/animate";

const ROWS = 20;
const COLS = 58;


export default function Board() {
  const [speed, setSpeed] = useState(80);
  const [grid, setGrid] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);

  
  const startPos = { row: 5, col: 5 };
  const endPos = { row: 10, col: 30 };

  useEffect(() => {
    const g = createGrid(ROWS, COLS);
    g[startPos.row][startPos.col].isStart = true;
    g[endPos.row][endPos.col].isEnd = true;
    setGrid(g);
  }, []);

  function runAlgo(name) {
  clearBoard();   // 🌟 Clears before running a new algo

  const start = grid[startPos.row][startPos.col];
  const end = grid[endPos.row][endPos.col];

  let res;
  if (name === "bfs") res = bfs(grid, start, end);
  if (name === "dfs") res = dfs(grid, start, end);
  if (name === "dijkstra") res = dijkstra(grid, start, end);
  if (name === "astar") res = astar(grid, start, end);
  if (name === "greedy") res = greedy(grid, start, end);

  animate(res.visited, res.path, setGrid);
}

function generateMaze() {
  clearBoard(); // clean board first

  const walls = recursiveDivision(grid);
  animateMaze(walls, setGrid);
}


  const handleMouseDown = (node) => {
    if (!node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
      setGrid([...grid]);
    }
    setMouseDown(true);
  };

  const handleMouseEnter = (node) => {
    if (mouseDown && !node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
      setGrid([...grid]);
    }
  };

  function clearBoard() {
  const newGrid = createGrid(ROWS, COLS);

  // reassign start/end nodes
  newGrid[startPos.row][startPos.col].isStart = true;
  newGrid[endPos.row][endPos.col].isEnd = true;

  setGrid(newGrid);
}

  const handleMouseUp = () => setMouseDown(false);

  return (
    <div>
      <div className="panel">
  <select onChange={(e) => runAlgo(e.target.value)}>
    <option value="">Select Algorithm</option>
    <option value="bfs">BFS</option>
    <option value="dfs">DFS</option>
    <option value="dijkstra">Dijkstra</option>
    <option value="astar">A*</option>
    <option value="greedy">Greedy</option>
  </select>

  <button onClick={generateMaze}>Generate Maze</button>
  <button onClick={clearBoard}>Clear Board</button>
  

  <div className="slider-box">
    <label>Speed</label>
    <input type="range" min="10" max="100" onChange={(e) => setSpeed(e.target.value)} />
  </div>
</div>




      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 25px)`
        }}
      >
        {grid.map((row, rIdx) =>
          row.map((node, cIdx) => (
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
