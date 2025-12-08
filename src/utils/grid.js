export function createGrid(rows, cols) {
  const grid = [];
  let id = 0;

  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        id: id++,
        row: r,
        col: c,
        isWall: false,
        isVisited: false,
        prev: null,
        distance: Infinity,
        f: Infinity,
        g: Infinity,
        h: 0,
      });
    }
    grid.push(row);
  }
  return grid;
}

export function getNeighbours(grid, node) {
  const { row, col } = node;
  const neighbours = [];

  const deltas = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  for (const [dr, dc] of deltas) {
    const r = row + dr;
    const c = col + dc;

    if (grid[r] && grid[r][c]) {
      neighbours.push(grid[r][c]);
    }
  }

  return neighbours;
}
