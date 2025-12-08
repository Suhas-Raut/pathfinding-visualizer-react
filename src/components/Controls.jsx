import React, { useRef, useEffect } from 'react';
import gameState from '../logic/gameState';
import { clearPath, clearBoard } from '../logic/utils';
import * as mazeGen from '../logic/mazeGen';
import * as searchAlgo from '../logic/searchAlgo';

const Controls = ({ boardRef }) => {
  const algo = useRef('');
  const delayRef = useRef(10);
  const pixelRef = useRef(24);

  useEffect(() => {
    // nothing on mount
  }, []);

  const onVisualize = () => {
    clearPath();
    // call search from searchAlgo which uses gameState globals
    switch (algo.current) {
      case '':
      case 'BFS':
        searchAlgo.BFS();
        break;
      case 'A*':
        searchAlgo.Astar();
        break;
      case 'Greedy':
        searchAlgo.greedy();
        break;
      case 'Bi-Directional':
        searchAlgo.biDirectional();
        break;
      case "Dijkstra's":
        searchAlgo.Dijkstra();
        break;
      case 'DFS':
        searchAlgo.DFS(gameState.source);
        if (searchAlgo.DFS(gameState.source)) {
          // handled in searchAlgo
        }
        break;
      default:
        searchAlgo.BFS();
    }
    // start animation (animate is exported from utils)
    const utils = require('../logic/utils');
    utils.animate(utils.searchToAnimateExport || [], 'visited', delayRef.current);
  };

  const onClearPath = () => {
    clearPath();
  };
  const onClearBoard = () => {
    clearBoard();
  };
  const onGenerateMaze = () => {
    clearBoard();
    mazeGen.generateMaze();
  };

  // options handlers (simple)
  const setSpeed = (label) => {
    if (label === 'Fast') delayRef.current = 7;
    else if (label === 'Normal') delayRef.current = 10;
    else delayRef.current = 50;
  };

  const setPixel = (w) => {
    pixelRef.current = Number(w);
    boardRef.current?.setCellWidth(Number(w));
  };

  const setAlgorithm = (text) => {
    algo.current = text.split(' ')[0] || 'BFS';
    const btn = document.getElementById('visualize');
    if (btn) btn.innerText = `Visualize ${algo.current}`;
  };

  return (
    <ul className="nav-menu" style={{gap:'12px', alignItems:'center'}}>
      <li id="clear-path" onClick={onClearPath}>Clear path</li>
      <li id="clear-board" onClick={onClearBoard}>Clear board</li>
      <li id="generate-maze" onClick={onGenerateMaze}>Generate Maze</li>

      <li id="pixel" className="drop-box">
        <div className="dropdown-trigger">Pixel <span className="carret"></span></div>
        <ul className="drop-menu">
          {[14,16,18,20,22,24,26].map(p => (
            <li key={p} onClick={() => setPixel(p)} className={p===24 ? 'active':''}>{p}px</li>
          ))}
        </ul>
      </li>

      <li id="speed" className="drop-box">
        <div className="dropdown-trigger">Speed <span className="carret"></span></div>
        <ul className="drop-menu">
          <li onClick={() => setSpeed('Slow')}>Slow</li>
          <li className="active" onClick={()=> setSpeed('Normal')}>Normal</li>
          <li onClick={()=> setSpeed('Fast')}>Fast</li>
        </ul>
      </li>

      <li id="algo" className="drop-box">
        <div className="dropdown-trigger">Algorithms <span className="carret"></span></div>
        <ul className="drop-menu">
          <li className="active" onClick={() => setAlgorithm('BFS')}>BFS</li>
          <li onClick={() => setAlgorithm('Bi-Directional BFS')}>Bi-Directional BFS</li>
          <li onClick={() => setAlgorithm('DFS')}>DFS</li>
          <li onClick={() => setAlgorithm("Dijkstra's Algorithm")}>Dijkstra's Algorithm</li>
          <li onClick={() => setAlgorithm('Greedy Best-first Search')}>Greedy Best-first Search</li>
          <li onClick={() => setAlgorithm('A* Algorithm')}>A* Algorithm</li>
        </ul>
      </li>

      <li><button id="visualize" className="btn" onClick={onVisualize}>Visualize</button></li>
    </ul>
  );
};

export default Controls;
