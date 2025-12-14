import { getNeighbours } from "../utils/grid";

export function bfs(grid, start, end) {
  const queue = [start];
  const visited = [];
  const visitedSet = new Set();
  visitedSet.add(`${start.row},${start.col}`);
  start.prev = null;

  while (queue.length) {
    const node = queue.shift();
    visited.push(node);

    if (node.row === end.row && node.col === end.col) break; // stop immediately at target

    for (const nei of getNeighbours(grid, node)) {
      const key = `${nei.row},${nei.col}`;
      if (!nei.isWall && !visitedSet.has(key)) {
        visitedSet.add(key);
        nei.prev = node;
        queue.push(nei);
      }
    }
  }

  // build path from end to start safely
  const path = [];
  let cur = end;
  while (cur && cur.prev) {
    path.push(cur);
    cur = cur.prev;
  }

  return { visited, path: path.reverse() };
}
