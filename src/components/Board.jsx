import React, { useState, useEffect } from "react";
import Node from "./Node";
import { createGrid } from "../utils/grid";
import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { dijkstra } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { animate } from "../utils/animate";

const ROWS = 21;
const COLS = 58;

export default function Board() {
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
    const start = grid[startPos.row][startPos.col];
    const end = grid[endPos.row][endPos.col];

    let res;
    if (name === "bfs") res = bfs(grid, start, end);
    if (name === "dfs") res = dfs(grid, start, end);
    if (name === "dijkstra") res = dijkstra(grid, start, end);
    if (name === "astar") res = astar(grid, start, end);

    animate(res.visited, res.path, setGrid);
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

  const handleMouseUp = () => setMouseDown(false);

  return (
    <div>
      <div className="controls">
        <button onClick={() => runAlgo("bfs")}>BFS</button>
        <button onClick={() => runAlgo("dfs")}>DFS</button>
        <button onClick={() => runAlgo("dijkstra")}>Dijkstra</button>
        <button onClick={() => runAlgo("astar")}>A*</button>
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
