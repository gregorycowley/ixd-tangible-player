import React, { useState, useEffect } from 'react';
import TouchSpot from './TouchSpot.jsx';

function TouchListener() {
  const [touches, setTouches] = useState([]);

  // Function to update touch data
  const handleTouch = (event) => {
    // Prevent the window from being scrolled
    // event.preventDefault();
    console.log('event.touches', event.touches);
    // Update state with current touches
    setTouches(
      [...event.touches].map((touch) => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
      }))
    );
  };

  const containerStyle = {
    touchAction: 'none',
  };

  // Effect to add and clean up the event listeners
  useEffect(() => {
    console.log('Touch Listener Mounted');
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('touchmove', handleTouch);
    window.addEventListener('touchend', handleTouch);

    return () => {
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchend', handleTouch);
    };
  }, []);

  return (
    <div style={containerStyle}>
      <h1>Touch Listener</h1>
      {touches.map((touch, index) => (
        <TouchSpot key={index} id={touch.id} x={touch.x} y={touch.y}></TouchSpot>
      ))}
    </div>
  );
}

export default TouchListener;
