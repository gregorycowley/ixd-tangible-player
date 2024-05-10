import React from 'react';


const TouchSpot = ({ id, x, y }) => {

  const offsetX = -400;
  const offsetY = -400;

  const spotStyle = {
    position: 'absolute',
    width: '100px',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'blue',
    fontSize: '10px',
    top:`${y + offsetY}px`,
    left:`${x + offsetX}px`
  };
  
  return (
    <svg width="100" height="100" style={spotStyle}>
      <circle cx="50" cy="50" r="25" fill="blue" />
    </svg>
  );
};

export default TouchSpot;
