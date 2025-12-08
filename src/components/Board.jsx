import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import gameState from '../logic/gameState';
import { set as setNode, clearBoard as clearBoardUtil } from '../logic/utils'; // small helper imports
import '../styles-to-import.css'; // just to silence import; actual styles are loaded from public

const Board = forwardRef((props, ref) => {
  const boardEl = useRef(null);
  const [cellWidth, setCellWidth] = useState(24);

  // create board based on current width and height
  function renderBoard() {
    const board = boardEl.current;
    if (!board) return;

    gameState.matrix = [];
    gameState.col = parseInt(board.clientWidth / cellWidth);
    gameState.row = parseInt(board.clientHeight / cellWidth);
    if (window.innerWidth <= 662) gameState.row -= 1;
    board.innerHTML = '';

    for (let i = 0; i < gameState.row; i++) {
      const rowElement = document.createElement('div');
      rowElement.setAttribute('id', `row-${i}`);
      rowElement.classList.add('row');
      let colList = [];
      for (let j = 0; j < gameState.col; j++) {
        const colElement = document.createElement('div');
        colElement.classList.add('col', 'unvisited');
        colElement.setAttribute('id', `${i}-${j}`);
        rowElement.appendChild(colElement);
        colList.push(colElement);
      }
      board.appendChild(rowElement);
      gameState.matrix.push(colList);
    }
    gameState.cells = document.querySelectorAll('.col');
    initBoardInteraction();
  }

  useEffect(() => {
    function onResize() {
      renderBoard();
      // re-place source/target
      gameState.source = setNode('source').value;
      gameState.target = setNode('target').value;
    }
    renderBoard();
    // initial source/target
    gameState.source = setNode('source').value;
    gameState.target = setNode('target').value;
    window.addEventListener('resize', debounce(onResize, 250));
    return () => window.removeEventListener('resize', debounce(onResize, 250));
    // eslint-disable-next-line
  }, [cellWidth]);

  // provide imperative methods to parent controls
  useImperativeHandle(ref, () => ({
    renderBoard,
    getBoardEl: () => boardEl.current,
    setCellWidth: (w) => setCellWidth(w)
  }));

  // board interactions (converted from original)
  function initBoardInteraction() {
    let draging = false;
    let drawing = false;
    let dragStart = null;
    const cells = document.querySelectorAll('.col');

    cells.forEach((cell) => {
      const pointDown = (e) => {
        if (e.target.classList.contains('source')) {
          dragStart = 'source';
          draging = true;
        } else if (e.target.classList.contains('target')) {
          dragStart = 'target';
          draging = true;
        } else {
          drawing = true;
        }
      };

      const pointUp = () => {
        drawing = false;
        draging = false;
        dragStart = null;
        if (gameState.source) gameState.matrix[gameState.source.x][gameState.source.y].classList.remove('wall');
        if (gameState.target) gameState.matrix[gameState.target.x][gameState.target.y].classList.remove('wall');
      };

      const pointMove = (e) => {
        const triggerElement = document.elementFromPoint(e.clientX, e.clientY);
        if (triggerElement == null || !triggerElement.classList.contains('col')) return;
        const cordinate = triggerElement.id.split('-');

        if (draging && dragStart) {
          cells.forEach(cell => cell.classList.remove(dragStart));
          triggerElement.classList.add(dragStart);

          if (dragStart === 'source') {
            gameState.source = { x: Number(cordinate[0]), y: Number(cordinate[1]) };
          } else {
            gameState.target = { x: Number(cordinate[0]), y: Number(cordinate[1]) };
          }
        } else if (drawing) {
          if (triggerElement.classList.contains('source') || triggerElement.classList.contains('target')) return;
          const x = Number(cordinate[0]);
          const y = Number(cordinate[1]);
          gameState.matrix[x][y].setAttribute('class', 'col wall');
        }
      };

      cell.addEventListener('pointerdown', pointDown);
      cell.addEventListener('pointermove', pointMove);
      cell.addEventListener('pointerup', pointUp);
      cell.addEventListener('click', () => {
        if (cell.classList.contains('source') || cell.classList.contains('target')) return;
        cell.classList.remove('visited', 'path');
        cell.classList.toggle('wall');
      });
    });
  }

  return (
    <div id="board" ref={boardEl} style={{height:'calc(100vh - 120px)'}}></div>
  );
});

// simple debounce
function debounce(fn, wait) {
  let t;
  return (...a) => (clearTimeout(t), t = setTimeout(() => fn(...a), wait));
}

export default Board;