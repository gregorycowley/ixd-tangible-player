import React, { useState, useEffect } from 'react';

// Utility function to calculate distance between two points
const calculateDistance = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

// Draggable item component
const DraggableItem = ({ id, onDrag }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      onDrag(id, { x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onDrag]);

  return <div onMouseDown={handleMouseDown} style={{ width: '50px', height: '50px', position: 'absolute', backgroundColor: 'blue', cursor: 'move' }}></div>;
};

// Parent component that controls the two draggable items
const DraggableController = () => {
  const [positions, setPositions] = useState({ item1: { x: 100, y: 100 }, item2: { x: 300, y: 300 } });
  const [color, setColor] = useState('rgb(255, 0, 0)');

  const onDrag = (id, newPosition) => {
    setPositions((prevPositions) => ({
      ...prevPositions,
      [id]: newPosition,
    }));
  };

  useEffect(() => {
    const distance = calculateDistance(positions.item1.x, positions.item1.y, positions.item2.x, positions.item2.y);
    const redIntensity = Math.max(0, 255 - distance / 2);
    setColor(`rgb(255, ${255 - redIntensity}, ${255 - redIntensity})`);
  }, [positions]);

  return (
    <div>
      <DraggableItem id="item1" onDrag={onDrag} />
      <DraggableItem id="item2" onDrag={onDrag} />
      <div style={{ position: 'absolute', top: positions.item1.y, left: positions.item1.x, backgroundColor: color }}></div>
      <div style={{ position: 'absolute', top: positions.item2.y, left: positions.item2.x, backgroundColor: color }}></div>
    </div>
  );
};

export default DraggableController;
