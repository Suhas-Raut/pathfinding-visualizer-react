import { PriorityQueue } from "../utils/priorityQueue";
import { getNeighbours } from "../utils/grid";

export function dijkstra(grid, start, end) {
  start.distance = 0;
  const pq = new PriorityQueue();
  pq.push(start, 0);

  const visited = [];

  while (!pq.isEmpty()) {
    const node = pq.pop();
    visited.push(node);

    if (node === end) break;

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

  const path = [];
  let cur = end;
  while (cur.prev) {
    path.push(cur);
    cur = cur.prev;
  }

  return { visited, path: path.reverse() };
}
