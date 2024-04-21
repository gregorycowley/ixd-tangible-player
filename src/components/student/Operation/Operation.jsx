import React from 'react';
import Puck1View from './Puck1View.jsx';
import bg from './assets/background.svg';

const containerStyle = {
  width: '1920px',
  height: '1080px',
  overflow: 'hidden',
};

const bgStyle = {
  position: 'absolute',
  height: '1920px',
  width: '1080px',
  zIndex: '-1',
  top: '0',
  left: '0',
  transform: 'rotate(90deg)',
};

const Operation = () => {
  return (
    <div style={containerStyle}>
      <img style={bgStyle} src={bg} alt="" className="src" />
      <Puck1View></Puck1View>
    </div>
  );
};

export default Operation;
