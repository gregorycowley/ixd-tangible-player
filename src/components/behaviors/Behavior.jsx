import React, { useEffect, useRef } from 'react';
import Draggable from './Draggable.jsx';
import Rotatable from './Rotatable.jsx';

const Behavior = ({ children }) => {
  const containerRef = useRef(null);
  const dragRef = useRef(null);
  const rotateRef = useRef(null);
  // const modifyRef = useRef(null);

  // const onMouseDown = (event) => {
  //   console.log('Behavior onMouseDown', event);
  // };

  const onDragUpdate = (x, y) => {
    // console.log('Behavior onDragUpdate', `${x}px`, `${y}px`, containerRef);
    // containerRef.current.style.left = `${x}px`;
    // containerRef.current.style.top = `${y}px`;
  };

  const onRotateUpdate = (rotation) => {
    // console.log('Behavior onRotateUpdate', rotation);
    containerRef.current.style.width = '150px';
    containerRef.current.style.height = '150px';
    containerRef.current.style.transform = `rotate(${rotation}deg)`;
  };

  useEffect(() => {
    const container = containerRef.current;
    const drag = dragRef.current;
    // const rotate = rotateRef.current;
    // console.log('Behavior useEffect', container, drag);
    // drag.addEventListener('mousedown', onMouseDown);
    // rotate.addEventListener('mousedown', onMouseDown);
    return () => {
      // drag.removeEventListener('mousedown', onMouseDown);
      // rotate.removeEventListener('mousedown', onMouseDown);
    };
  }, [containerRef, dragRef]);

  const containerStyles = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    transform: 'rotate(0deg)',
    transformOrigin: 'center',
    pointerEvent: 'none',
  };

  const childContainerStyles = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    pointerEvent: 'none',
  };

  return (
    <div ref={containerRef} style={containerStyles}>
      <div style={childContainerStyles}>{children}</div>
      <Draggable ref={dragRef} updateHandler={onDragUpdate} />
      <Rotatable ref={rotateRef} updateHandler={onRotateUpdate} />
    </div>
  );
};

export default Behavior;
