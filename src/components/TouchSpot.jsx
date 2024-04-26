import React from 'react';

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
};

const TouchSpot = ({ id, x, y }) => {
  return (
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="25" fill="blue" />
    </svg>
  );
};

export default TouchSpot;
