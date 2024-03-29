// Circle.js
import React, { useState } from 'react';

const Circle = ({ id, initialX, initialY, onDrag }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });

  const onMouseDown = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;

    const onMouseMove = (moveEvent) => {
      const newX = position.x + moveEvent.clientX - startX;
      const newY = position.y + moveEvent.clientY - startY;
      setPosition({ x: newX, y: newY });
      onDrag(id, newX, newY);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: '50px',
        height: '50px',
        backgroundColor: 'blue',
        borderRadius: '50%',
        cursor: 'pointer',
      }}
      onMouseDown={onMouseDown}
    ></div>
  );
};

export default Circle;