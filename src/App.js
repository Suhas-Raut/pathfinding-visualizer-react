import React, { useRef } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import Tutorial from './components/Tutorial';
import './app-overrides.css'; // small overrides to load fonts if needed

// Styles are served from public/styles/* (keeps your original CSS intact)
function App() {
  const boardRef = useRef();

  return (
    <div className="template">
      <Tutorial ref={boardRef} />
      <header>
        <nav>
          <h1><a id="logo" href="/">pathfinding visualizer</a></h1>
          <Controls boardRef={boardRef} />
        </nav>

        {/* Guide bar will be rendered inside Board component */}
      </header>

      <main style={{height:'100%'}}>
        <Board ref={boardRef} />
      </main>
    </div>
  );
}

export default App;
