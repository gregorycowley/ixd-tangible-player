import React, { useState } from 'react';

// Helper function to generate a star path
const createStarPath = (cx, cy, spikes, outerRadius, innerRadius) => {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  let path = 'M ' + cx + ' ' + (cy - outerRadius) + ' ';
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    path += `L ${x} ${y} `;
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    path += `L ${x} ${y} `;
    rot += step;
  }
  path += 'z';
  return path;
};

const DraggableStar = () => {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [size, setSize] = useState(100);
  const [points, setPoints] = useState(5);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault(); // Prevent text selection
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newSize = Math.max(10, size + e.movementX);
      setSize(newSize);
      setPosition({
        x: position.x + e.movementX,
        y: position.y + e.movementY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    const newPoints = Math.max(3, points + Math.sign(e.deltaY));
    setPoints(newPoints);
  };

  return (
    <svg width="100%" height="100%" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onWheel={handleWheel}>
      <path
        d={createStarPath(position.x, position.y, points, size, size / 2)}
        fill="gold"
        onMouseDown={handleMouseDown}
        style={{ cursor: 'pointer' }}
      />
    </svg>
  );
};

export default DraggableStar;
