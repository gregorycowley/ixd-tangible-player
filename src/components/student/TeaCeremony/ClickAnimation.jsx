import React, { useEffect, useState, useRef } from 'react';

import FlowerAnimation from './FlowerAnimation.jsx';

const ClickAnimation = ({ season = 'Spring' }) => {
  // State to store click positions and a unique ID for each click
  const ref = useRef();
  const [clickPositions, setClickPositions] = useState([]);

  const duration = 4000;

  const clickAnimationStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'auto',
  };

  useEffect(() => {
    const handleScreenClick = (e) => {
      // Get click position
      const x = e.clientX;
      const y = e.clientY;
      console.log('click', x, y);
      // Add the new click position to the state with a unique ID
      setClickPositions((prevPositions) => [...prevPositions, { id: Date.now(), x, y }]);
    };
    ref.current.addEventListener('click', handleScreenClick);
    return () => {
      ref.current.removeEventListener('click', handleScreenClick);
    };
  }, [ref, clickPositions]);

  return (
    <div ref={ref} id="clickarea" style={clickAnimationStyle}>
      {clickPositions.map((pos) => (
        <FlowerAnimation
          key={pos.id}
          pos={pos}
          duration={duration}
          season={season}
          removeSelf={() => {}}
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            display: 'block',
            transform: 'translate(-50%, -50%) scale(0.5)',
          }}
        />
      ))}
    </div>
  );
};

export default ClickAnimation;
