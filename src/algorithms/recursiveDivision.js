export function recursiveDivision(grid, walls = []) {
  const rows = grid.length;
  const cols = grid[0].length;

  function divide(rowStart, rowEnd, colStart, colEnd, orientation) {
    if (rowEnd < rowStart || colEnd < colStart) return;

    if (orientation === "H") {
      let possibleRows = [];
      for (let i = rowStart + 1; i <= rowEnd - 1; i += 2) {
        possibleRows.push(i);
      }
      let possibleCols = [];
      for (let i = colStart; i <= colEnd; i += 2) {
        possibleCols.push(i);
      }
      if (!possibleRows.length || !possibleCols.length) return;

      const row = possibleRows[Math.floor(Math.random() * possibleRows.length)];
      const hole = possibleCols[Math.floor(Math.random() * possibleCols.length)];

      for (let col = colStart; col <= colEnd; col++) {
        if (col !== hole) walls.push([row, col]);
      }

      divide(rowStart, row - 2, colStart, colEnd, chooseOrientation(rowStart, row - 2, colStart, colEnd));
      divide(row + 2, rowEnd, colStart, colEnd, chooseOrientation(row + 2, rowEnd, colStart, colEnd));

    } else {
      let possibleCols = [];
      for (let i = colStart + 1; i <= colEnd - 1; i += 2) {
        possibleCols.push(i);
      }
      let possibleRows = [];
      for (let i = rowStart; i <= rowEnd; i += 2) {
        possibleRows.push(i);
      }
      if (!possibleRows.length || !possibleCols.length) return;

      const col = possibleCols[Math.floor(Math.random() * possibleCols.length)];
      const hole = possibleRows[Math.floor(Math.random() * possibleRows.length)];

      for (let row = rowStart; row <= rowEnd; row++) {
        if (row !== hole) walls.push([row, col]);
      }

      divide(rowStart, rowEnd, colStart, col - 2, chooseOrientation(rowStart, rowEnd, colStart, col - 2));
      divide(rowStart, rowEnd, col + 2, colEnd, chooseOrientation(rowStart, rowEnd, col + 2, colEnd));
    }
  }

  function chooseOrientation(rStart, rEnd, cStart, cEnd) {
    const width = cEnd - cStart;
    const height = rEnd - rStart;
    return width > height ? "V" : "H";
  }

  divide(0, rows - 1, 0, cols - 1, chooseOrientation(0, rows - 1, 0, cols - 1));
  return walls;
}
