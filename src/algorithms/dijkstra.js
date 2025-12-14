import { PriorityQueue } from "../utils/priorityQueue";
import { getNeighbours } from "../utils/grid";

export function dijkstra(grid, start, end) {
  // Reset nodes
  grid.forEach(row =>
    row.forEach(node => {
      node.distance = Infinity;
      node.prev = null;
    })
  );

  start.distance = 0;

  const pq = new PriorityQueue();
  pq.push(start, 0);

  const visited = [];
  const finalized = new Set(); // nodes whose shortest distance is finalized

  while (!pq.isEmpty()) {
    const node = pq.pop();
    const key = `${node.row},${node.col}`;

    // Skip if already finalized
    if (finalized.has(key)) continue;

    finalized.add(key);
    visited.push(node);

    // Stop as soon as target is finalized
    if (node.row === end.row && node.col === end.col) break;

    for (const nei of getNeighbours(grid, node)) {
      if (nei.isWall) continue;

      const newDist = node.distance + 1;

      if (newDist < nei.distance) {
        nei.distance = newDist;
        nei.prev = node;
        pq.push(nei, newDist);
      }
    }
  }

  // Build shortest path
  const path = [];
  let cur = end;
  while (cur && cur.prev) {
    path.push(cur);
    cur = cur.prev;
  }

  return { visited, path: path.reverse() };
}
