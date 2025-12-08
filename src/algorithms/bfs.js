import { getNeighbours } from "../utils/grid";

export function bfs(grid, start, end) {
  const queue = [start];
  const visited = [];
  start.isVisited = true;

  while (queue.length) {
    const node = queue.shift();
    visited.push(node);

    if (node === end) break;

    for (const nei of getNeighbours(grid, node)) {
      if (!nei.isVisited && !nei.isWall) {
        nei.isVisited = true;
        nei.prev = node;
        queue.push(nei);
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
