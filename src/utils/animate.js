export function animate(visitedNodes, pathNodes, setGrid) {
  let i = 1;

  function animateVisited() {
    if (i === visitedNodes.length-1) {
      return animatePath();
    }

    const node = visitedNodes[i];
    setGrid(prev => {
      const gridCopy = [...prev];
      gridCopy[node.row][node.col] = { ...node, isVisited: true };
      return gridCopy;
    });

    i++;
    setTimeout(animateVisited, 3);
  }

  let j = 0;

  function animatePath() {
    if (j === pathNodes.length-1) return;

    const node = pathNodes[j];
    setGrid(prev => {
      const gridCopy = [...prev];
      gridCopy[node.row][node.col] = { ...node, isPath: true };
      return gridCopy;
    });

    j++;
    setTimeout(animatePath, 3);
  }

  animateVisited();
}

export function animateMaze(walls, setGrid) {
  walls.forEach(([r, c], index) => {
    setTimeout(() => {
      setGrid(prev => {
        const copy = [...prev];
        if (!copy[r][c].isStart && !copy[r][c].isEnd) {
          copy[r][c].isWall = true;
        }
        return copy;
      });
    }, index * 10);
  });
}
