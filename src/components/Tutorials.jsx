import React, { forwardRef, useEffect } from 'react';

const Tutorial = forwardRef((props, ref) => {
  useEffect(() => {
    const visited = localStorage.getItem('visited');
    if (!visited) {
      const t = document.getElementById('tutorial');
      if (t) t.classList.add('active');
      localStorage.setItem('visited','true');
    }
  }, []);

  return (
    <div className="tutorial" id="tutorial">
      {/* copy the HTML structure of your original tutorial here */}
      {/* For brevity I include minimal structure — the CSS you provided controls visuals */}
      <div className="card">
        <div className="upper">
          <div className="slide">
            <h2>What's Pathfinding Visualizer?</h2>
            <div className="img-box"></div>
            <p>
              A <span className="blue">pathfinding visualizer</span> is a tool that shows how search  
              <span className="blue">algorithms</span> find
              <span className="blue">The Shortest-Path</span> between two points by animating their step-by-step exploration of the grid.
            </p>
          </div>
          {/* ... keep the rest of slides as in your original index.html if you want */}
        </div>

        <div className="dots"></div>
        <div className="bottom">
          <div className="left">
            <div className="btn" id="skip">skip tutorial</div>
          </div>
          <div className="right">
            <div id="prev" className="btn unactive">previous</div>
            <div id="next" className="btn">next</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Tutorial;
