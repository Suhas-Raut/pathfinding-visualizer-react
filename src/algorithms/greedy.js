import { PriorityQueue } from "../utils/priorityQueue";
import { getNeighbours } from "../utils/grid";

function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function greedy(grid, start, end) {
  const pq = new PriorityQueue();
  pq.push(start, 0);

  const visited = [];
  const seen = new Set();
  seen.add(`${start.row},${start.col}`);
  start.prev = null;

  while (!pq.isEmpty()) {
    const node = pq.pop();
    visited.push(node);

    // ✅ Compare coordinates instead of object references
    if (node.row === end.row && node.col === end.col) break;

    for (const nei of getNeighbours(grid, node)) {
      if (nei.isWall) continue;

      const key = `${nei.row},${nei.col}`;
      if (seen.has(key)) continue;

      seen.add(key);
      nei.prev = node;
      const h = heuristic(nei, end);

      pq.push(nei, h); // greedy = prioritize by heuristic only
    }
  }

  // build path
  const path = [];
  let cur = grid[end.row][end.col];
  while (cur.prev) {
    path.push(cur);
    cur = cur.prev;
  }

  return { visited, path: path.reverse() };
}
