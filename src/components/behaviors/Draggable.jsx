import React, { useState, useCallback, useRef } from 'react';
import drag from './drag.svg';

function Draggable({children}) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef();

  // This callback initializes the dragging process
  const onMouseDown = useCallback((event) => {
    setIsDragging(true);
    ref.current = {
      offsetX: event.clientX - position.x,
      offsetY: event.clientY - position.y,
    };
  }, [position]);

  // This callback calculates the new position of the component as it's being dragged
  const onMouseMove = useCallback((event) => {
    if (isDragging) {
      const x = event.clientX - ref.current.offsetX;
      const y = event.clientY - ref.current.offsetY;
      setPosition({ x, y });
    }
  }, [isDragging]);

  // This callback ends the dragging process
  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Inline styles for the draggable component
  const styles = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none', // Prevents the browser from performing text selection during drag
    
    // width: '100px',
    // height: '100px',
    // backgroundColor: '#4CAF50', // Just a placeholder color
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // color: 'white',
    // borderRadius: '5px'
  };

  return (
    <div
      style={styles}
      onMouseDown={onMouseDown}
      onMouseMove={isDragging ? onMouseMove : null}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp} // Ends drag when the mouse leaves the element area
    >
      <img src={drag} />
      {children}
    </div>
  );
}

export default Draggable;
