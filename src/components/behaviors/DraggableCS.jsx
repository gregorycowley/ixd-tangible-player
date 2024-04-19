import { use } from 'chai';
import React, { forwardRef } from 'react';

const DraggableCS = forwardRef(({ children }, controlRef) => {
  const svgStyles = {
    fill: 'none',
    position: 'relative',
    width: '150px',
    height: '150px',
    opacity: 0.1,
    // cursor: 'none',
    // pointerEvents: 'none',
    pointerEvent: 'fill',
    userSelect: 'none',
  };

  const outerRingStyles = {
    fill: 'none',
    stroke: 'none',
    strokeMiterlimit: '10',
    // cursor: 'none',
    // pointerEvents: 'none'
    pointerEvent: 'fill',
    userSelect: 'none',
  };

  const dragAreaStyles = {
    fill: '#00dee7',
    stroke: 'none',
    strokeWidth: '0px',
    // cursor: 'none',
    pointerEvents: 'fill',
    userSelect: 'none',
    // pointerEvents: 'fill'
  };

  return (
    <svg
      style={svgStyles}
      id="DraggableControlSurface"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 264.62 264.62">
      <g id="HotSpots">
        <circle style={outerRingStyles} id="OuterRing" cx="132.31" cy="132.31" r="131.81" />
        <circle
          style={dragAreaStyles}
          ref={controlRef}
          id="InnerRing"
          cx="132.31"
          cy="132.31"
          r="107.58"
        />
      </g>
    </svg>
  );
});

export default DraggableCS;
