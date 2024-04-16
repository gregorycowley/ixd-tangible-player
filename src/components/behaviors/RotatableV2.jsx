import React, { useState, useRef } from 'react';
import rotate from './rotate-hit-area.svg';

function Rotatable({children}) {
  const [rotation, setRotation] = useState(0); // Initial rotation
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef(null);
    
  // Function to calculate the angle between two points
  const calculateAngle = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return angle;
  };

  const onMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = calculateAngle(centerX, centerY, event.clientX, event.clientY);
    ref.current.startAngle = angle - rotation; // Store the initial angle offset
  };

  const onMouseMove = (event) => {
    if (isDragging) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = calculateAngle(centerX, centerY, event.clientX, event.clientY);
      const newRotation = angle - ref.current.startAngle;
      setRotation(newRotation);
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseMove={isDragging ? onMouseMove : null}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp} // Stop rotating when the mouse leaves the element
      style={{
        position: 'absolute',
        width: '150px',
        height: '150px',
        userSelect: 'contain', // Prevent text selection
        cursor: 'grab',
        transform: `rotate(${rotation}deg)`, // Apply the rotation
        transition: 'transform 0.1s' // Smooth transition for rotation
      }}
    >
      <img src={rotate} />
      {children}
    </div>
  );
}

export default Rotatable;
