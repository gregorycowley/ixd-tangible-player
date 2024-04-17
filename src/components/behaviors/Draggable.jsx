import React, { useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import DraggableCS from './DraggableCS.jsx';

const Draggable = forwardRef(function Draggable({ children, updateHandler }, controlRef) {
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);
  const isDraggable = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const parameterRef = useRef({ x: 0, y: 0 });

  const start = useCallback(
    (mouseX, mouseY) => {
      isDraggable.current = true;
      controlRef.current.style.cursor = 'grabbing';
      const elementsCurrentPosition = elementRef.current.getBoundingClientRect();
      // Offset needs to be relative to the element's position
      offsetRef.current = {
        x: mouseX - elementsCurrentPosition.x,
        y: mouseY - elementsCurrentPosition.y,
      };

      // parameterRef.current.isDragging = true;
      // console.log('Draggable start', offsetRef.current);
    },
    [controlRef]
  );

  const move = useCallback((x, y) => {
    // console.log('Draggable move', x, y);
    elementRef.current.style.left = `${x}px`;
    elementRef.current.style.top = `${y}px`;
  }, []);

  const update = useCallback(
    (mouseX, mouseY) => {
      // console.log('Draggable update', mouseX, mouseY );
      if (isDraggable.current) {
        parameterRef.current.x = mouseX - offsetRef.current.x;
        parameterRef.current.y = mouseY - offsetRef.current.y;
        updateHandler(parameterRef.current.x, parameterRef.current.y);
        // move(parameterRef.current.x, parameterRef.current.y);
      }
    },
    [updateHandler]
  );

  const end = useCallback(() => {
    // console.log('Draggable end');
    controlRef.current.style.cursor = 'grab';
    isDraggable.current = false;
  }, [controlRef]);

  /*
    // The event.target is the same as the controlRef.current
    // Do we even need a controlRef then?
  */
  const onMouseDown = useCallback(
    (event) => {
      // console.log('Draggable onMouseDown', event);
      start(event.clientX, event.clientY);
    },
    [start]
  );

  const onMouseMove = useCallback(
    (event) => {
      update(event.clientX, event.clientY);
    },
    [update]
  );

  const onMouseUp = useCallback(
    (event) => {
      // console.log('Draggable onMouseUp', event);
      end();
    },
    [end]
  );

  // const onMouseDown = (event) => {
  //   // console.log('Draggable onMouseDown', event);
  //   start(event.clientX, event.clientY);
  // };

  // const onMouseMove = (event) => {
  //   // console.log('Draggable onMouseMove', event.clientX, event.clientY);
  //   update(event.clientX, event.clientY);
  // };

  // const onMouseUp = (event) => {
  //   // console.log('Draggable onMouseUp', event);
  //   end();
  // };

  useEffect(() => {
    const hotspotRef = controlRef.current;
    // console.log('Draggable useEffect', controlRef );
    // hotspotRef.style.fill = 'red';
    hotspotRef.addEventListener('mousedown', onMouseDown);
    hotspotRef.addEventListener('mousemove', onMouseMove);
    hotspotRef.addEventListener('mouseleave', onMouseUp);
    hotspotRef.addEventListener('mouseup', onMouseUp);
    return () => {
      hotspotRef.removeEventListener('mousedown', onMouseDown);
      hotspotRef.removeEventListener('mousemove', onMouseMove);
      hotspotRef.removeEventListener('mouseleave', onMouseUp);
      hotspotRef.removeEventListener('mouseup', onMouseUp);
    };
  }, [controlRef, onMouseDown, onMouseMove, onMouseUp]);

  const draggableStyles = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    cursor: 'auto',
    userSelect: 'auto',
    pointerEvents: 'none',
    // border: '1px solid red',
  };

  return (
    <div ref={elementRef} style={draggableStyles} id="draggable-behavior">
      <DraggableCS ref={controlRef} />
      {children}
    </div>
  );
});

export default Draggable;
