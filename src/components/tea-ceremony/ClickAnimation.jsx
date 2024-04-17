import React, { useEffect, useState } from 'react';

// const gifUrl = './assets/01_Spring.gif'; // Replace this with your GIF URL
// import gifAnimation from './assets/01_Spring.gif';
import FlowerAnimation from './FlowerAnimation.jsx';

const ClickAnimation = ({season='Spring'}) => {
  // State to store click positions and a unique ID for each click
  const [clickPositions, setClickPositions] = useState([]);
  const duration = 4000; 
  const clickAnimationStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100vw', 
    height: '100vh',
    pointerEvents: 'auto'
  };

  useEffect(() => {
    const handleScreenClick = (e) => {
    // Get click position
      const x = e.clientX;
      const y = e.clientY;
      // Add the new click position to the state with a unique ID
      setClickPositions((prevPositions) => [
        ...prevPositions,
        { id: Date.now(), x, y },
      ]);
    };
  }, []);

  return (
    <div id="clickarea" onClick={handleScreenClick} style={clickAnimationStyle}>
      {clickPositions.map((pos) => (
        <FlowerAnimation
          key={pos.id}
          pos={pos}
          duration={duration}
          season={season}
          removeSelf = {() => {
          }}
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            transform: 'translate(-50%, -50%) scale(0.5)',
          }}
        />
      ))}
    </div>
  );
};

export default ClickAnimation;