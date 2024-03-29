import React, { useState } from 'react';
import './Circle.css'; // Assuming your CSS is defined here

const CircleWithIndicator = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0); // Rotation in degrees
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Initial position
  const [startDragPoint, setStartDragPoint] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartDragPoint({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startDragPoint.x,
        y: e.clientY - startDragPoint.y,
      });
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onWheel = (e) => {
    setRotation((prevRotation) => prevRotation + e.deltaY * 0.1);
  };

  return (
    <div
      className="circle"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onWheel={onWheel}
    >
      <div className="indicator"></div>
    </div>
  );
};

export default CircleWithIndicator;