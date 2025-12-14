export function animate(visitedNodes, pathNodes, setGrid) {
  let i = 1;

  function animateVisited() {
    if (i === visitedNodes.length - 1) {
      return animatePath();
    }

    const node = visitedNodes[i];

    setGrid(prev => {
      const gridCopy = prev.map(row => row.map(n => ({ ...n })));

      // ❗ Do NOT animate walls, start, or end
      if (!gridCopy[node.row][node.col].isWall &&
          !gridCopy[node.row][node.col].isStart &&
          !gridCopy[node.row][node.col].isEnd) {

        gridCopy[node.row][node.col].isVisited = true;
      }

      return gridCopy;
    });

    i++;
    setTimeout(animateVisited, 10);
  }

  let j = 0;

  function animatePath() {
    if (j === pathNodes.length - 1) return;

    const node = pathNodes[j];

    setGrid(prev => {
      const gridCopy = prev.map(row => row.map(n => ({ ...n })));

      // ❗ Do NOT animate walls
      if (!gridCopy[node.row][node.col].isWall &&
          !gridCopy[node.row][node.col].isStart &&
          !gridCopy[node.row][node.col].isEnd) {

        gridCopy[node.row][node.col].isPath = true;
      }

      return gridCopy;
    });

    j++;
    setTimeout(animatePath, 15);
  }

  animateVisited();
}
export function animateMaze(walls, setGrid) {
  walls.forEach(([r, c], index) => {
    setTimeout(() => {
      setGrid(prev => {
        const copy = [...prev];
        const node = copy[r][c];

        if (!node.isStart && !node.isEnd) {
          copy[r][c] = {
            ...node,
            isWall: true,      // ensures CSS wall class gets applied
            isVisited: false,  // remove any accidental flags
            isPath: false
          };
        }
        return copy;
      });
    }, index * 10);
  });
}