import { PriorityQueue } from "../utils/priorityQueue";
import { getNeighbours } from "../utils/grid";

function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function astar(grid, start, end) {
  start.g = 0;
  start.f = heuristic(start, end);

  const pq = new PriorityQueue();
  pq.push(start, start.f);

  const visited = [];

  while (!pq.isEmpty()) {
    const node = pq.pop();
    visited.push(node);

    if (node === end) break;

    for (const nei of getNeighbours(grid, node)) {
      if (nei.isWall) continue;

      const g = node.g + 1;
      const f = g + heuristic(nei, end);

      if (f < nei.f) {
        nei.g = g;
        nei.f = f;
        nei.prev = node;
        pq.push(nei, f);
      }
    }
  }

  const path = [];
  let cur = end;
  while (cur.prev) {
    path.push(cur);
    cur = cur.prev;
  }

  return { visited, path: path.reverse() };
}
