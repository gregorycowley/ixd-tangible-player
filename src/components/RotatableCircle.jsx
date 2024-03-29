import React, { useState } from 'react';

const RotatableCircle = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const currentX = e.clientX;
      const diffX = currentX - startX;
      setRotationAngle(prevAngle => prevAngle + diffX);
      setStartX(currentX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop rotating if the mouse leaves the component
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: 'skyblue',
        transform: `rotate(${rotationAngle}deg)`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    />
  );
};

export default RotatableCircle;