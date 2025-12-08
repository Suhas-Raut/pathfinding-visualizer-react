import { getNeighbours } from "../utils/grid";

export function dfs(grid, start, end) {
  const stack = [start];
  const visited = [];
  start.isVisited = true;

  while (stack.length) {
    const node = stack.pop();
    visited.push(node);

    if (node === end) break;

    for (const nei of getNeighbours(grid, node)) {
      if (!nei.isVisited && !nei.isWall) {
        nei.isVisited = true;
        nei.prev = node;
        stack.push(nei);
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
