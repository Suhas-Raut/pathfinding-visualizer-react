export function animate(visitedNodes, pathNodes, setGrid) {
  let i = 0;

  function animateVisited() {
    if (i === visitedNodes.length) {
      return animatePath();
    }

    const node = visitedNodes[i];
    setGrid(prev => {
      const gridCopy = [...prev];
      gridCopy[node.row][node.col] = { ...node, isVisited: true };
      return gridCopy;
    });

    i++;
    setTimeout(animateVisited, 5);
  }

  let j = 0;

  function animatePath() {
    if (j === pathNodes.length) return;

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
