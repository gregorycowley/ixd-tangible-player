import React, { useState, useEffect } from 'react';

function TouchGraphics() {
  const [touches, setTouches] = useState([]);

  // Update touches for touch start or move
  const updateTouches = (event) => {
    event.preventDefault();
    setTouches(
      [...event.touches].map((touch) => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
      }))
    );
  };

  // Remove touch points that have ended
  const removeTouch = (event) => {
    event.preventDefault();
    const activeIds = [...event.touches].map((touch) => touch.identifier);
    setTouches((current) => current.filter((touch) => activeIds.includes(touch.id)));
  };

  // Effect to attach and cleanup event listeners
  useEffect(() => {
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
  }, []);

  return (
    <div>
      {touches.map((touch) => (
        <div
          key={touch.id}
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
