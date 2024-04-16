import React, { useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import RotatableCS from './RotatableCS.jsx';

const Rotatable = forwardRef(({children, updateHandler}, rotatableRef) => {
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const controlRef = useRef(null);
  const parameterRef = useRef({ isDragging: false, originAngle: 0, startAngle: 0 });

  function calculateAngle(x, y) {
    const rect = rotatableRef.current.getBoundingClientRect();
    // rotatableRef.current.style.border = '3px solid green';
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // console.log('calculateAngle', centerX, centerY);
    const mouseX = x;
    const mouseY = y;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  }

  // Calculations separated from the event handlers
  const start = (mousePostionX, mousePostionY) => {
    console.log('Rotatable start', parameterRef.current.originAngle, parameterRef.current.startAngle);
    parameterRef.current.isDragging = true;
    parameterRef.current.startAngle = calculateAngle(mousePostionX, mousePostionY);
    // rotatableRef.current.style.cursor = 'grabbing';
  };

  const update = (mousePostionX, mousePostionY) => {
    console.log('Rotatable update', parameterRef.current.originAngle);
    if (parameterRef.current.isDragging) {
      const currentAngle = calculateAngle(mousePostionX, mousePostionY);
      const deltaAngle = currentAngle - parameterRef.current.startAngle;
      const newAngle = parameterRef.current.originAngle + deltaAngle;
      setRotation(newAngle);
      parameterRef.current.originAngle = newAngle;
      rotationRef.current = newAngle;
      updateHandler(newAngle);
      // rotatableRef.current.style.transform = `rotate(${parameterRef.current.originAngle + deltaAngle}deg)`;
    }
  };

  const end = () => {
    console.log('Rotatable end', rotationRef.current);
    if (parameterRef.current.isDragging) {
      const currentTransform = rotatableRef.current.style.transform;
      const angleMatch = /rotate\(([-\d.]+)deg\)/.exec(currentTransform);
      if (angleMatch && angleMatch[1]) {
        parameterRef.current.originAngle += parseFloat(angleMatch[1]) - parameterRef.current.originAngle;
      }
      parameterRef.current.isDragging = false;
      // rotatableRef.current.style.cursor = 'grab';
    }
  };

  const onMouseDown = useCallback((event) => {
    start(event.clientX, event.clientY);
  },[]);

  const onMouseMove = useCallback((event) => {
    update(event.clientX, event.clientY);
  }, []);

  const onMouseUp = useCallback(() => {
    end();
  },[]);

  useEffect(() => {
    const svgRing = controlRef.current;
    // console.log('Rotatable useEffect', controlRef );
    // console.log('useEffect', svgRing );
    svgRing.addEventListener('mousedown', onMouseDown);
    svgRing.addEventListener('mousemove', onMouseMove);
    svgRing.addEventListener('mouseleave', onMouseUp);
    svgRing.addEventListener('mouseup', onMouseUp);

    return () => {
      svgRing.removeEventListener('mousedown', onMouseDown);
      svgRing.removeEventListener('mousemove', onMouseMove);
      svgRing.removeEventListener('mouseleave', onMouseUp); 
      svgRing.removeEventListener('mouseup', onMouseUp);
    };
  }, [ ]);

  const rotatableStyles = {
    width: '150px',
    height: '150px',
    position: 'absolute',
    cursor: 'pointer', 
    transform: 'rotate(0deg)', 
    transformOrigin: 'center',
    userSelect: 'none',
    pointerEvents: 'none', // <- important: Only the selectable SVG eleament shoud have a pointer event
    border: '1px solid blue',
  };

  return (
    <div data-testid="rotatable-behavior" style={rotatableStyles} ref={rotatableRef} className="rotatable-behavior">
      <RotatableCS 
        ref={controlRef}
        rotation={rotation} 
      />
      {children}
    </div>
  );
});

export default Rotatable;
