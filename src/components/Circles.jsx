// App.js
import React, { useState } from 'react';
import Circle from './Circle';

const generateInitialPositions = () => {
  let positions = [];
  for (let i = 0; i < 10; i++) {
    positions.push({
      id: i,
      x: Math.random() * (window.innerWidth - 50),
      y: Math.random() * (window.innerHeight - 50),
    });
  }
  return positions;
};

const App = () => {
  const [circles, setCircles] = useState(generateInitialPositions());

  const onDrag = (id, x, y) => {
    const newCircles = circles.map((circle) => {
      if (circle.id === id) {
        return { ...circle, x, y };
      }
      return circle;
    });
    setCircles(newCircles);
  };

  const onSave = () => {
    const json = JSON.stringify(circles);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'circle-positions.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {circles.map((circle) => (
        <Circle key={circle.id} id={circle.id} initialX={circle.x} initialY={circle.y} onDrag={onDrag} />
      ))}
      <button onClick={onSave} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        Save Positions
      </button>
    </div>
  );
};

export default App;