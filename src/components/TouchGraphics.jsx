import React, { useState, useEffect, useContext } from 'react';

function TouchGraphics() {
  const [touches, setTouches] = useState([]);

  useEffect(() => {
    const updateTouches = (event) => {
      const currentTouches = touches;
      const newTouches = [...event.touches].map((touch) => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
      }));
      const mergedArray = [...currentTouches, ...newTouches];
      setTouches(mergedArray);
    };

    // Remove touch points that have ended
    const removeTouch = (event) => {
      // ! Not working
      event.preventDefault();
      const activeIds = [...event.touches].map((touch) => touch.identifier);
    };

    window.addEventListener('touchstart', updateTouches);
    window.addEventListener('touchmove', updateTouches);
    window.addEventListener('touchend', removeTouch);
    window.addEventListener('touchcancel', removeTouch);

    return () => {
      window.removeEventListener('touchstart', updateTouches);
      window.removeEventListener('touchmove', updateTouches);
      window.removeEventListener('touchend', removeTouch);
      window.removeEventListener('touchcancel', removeTouch);
    };
  }, [touches]);

  return (
    <div id="touch-graphics">
      <h1>Touch Graphics</h1>
      {touches.map((touch, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${touch.x}px`,
            top: `${touch.y}px`,
            width: '20px',
            height: '20px',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}

export default TouchGraphics;
