import React, { forwardRef } from 'react';

const RotatableCS = forwardRef( ({ rotation }, controlRef) => {

  const svgstyles = {
    fill: '#00dee7',
    width: '150px',
    height: '150px',
    opacity: .1,
    pointerEvents: 'none',
  };

  const ringstyles = {
    fill:'none',
    stroke:'red',
    strokeMiterlimit:'10',
    strokeWidth:'22px',
    pointerEvents: 'stroke',
  };

  const dotStyles = {
    fill: '#00dee7',
    strokeWidth: '0px',
    pointerEvents: 'none',
  };

  const texyStyles = {
    width: '100px',
    height: '100px',
    backgroundColor: 'red',
    fontSize: '5rem',
    fill: 'blue',
    pointerEvents: 'none',
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 263.62 263.62"
      style={svgstyles}
    >
      <g id="RingContainer">
        {/* <text  
          x="90" 
          y="200" 
          fill="red"
          style={texyStyles}
        >
          {rotation}
        </text> */}
       
        <circle 
          id="Ring"
          ref={controlRef}
          style={ringstyles}
          cx="131" 
          cy="131" 
          r="120"/>
        
        <circle 
          className="cls2"
          style={dotStyles}
          cx="131.81" 
          cy="12.3" 
          r="8.28"/>
      </g>
    </svg>
  );
} );

export default RotatableCS;