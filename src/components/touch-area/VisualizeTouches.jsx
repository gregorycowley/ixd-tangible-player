import React from 'react';
import VisualCircles from './VisualCircles.jsx';
import points from '../../../data/send_multiple.json';

const VisualizeTouches = () => {
  // const svgCircles = touches.map((touch, index) => (
  //   <VisualCircles key={index} points={touch.points} />
  // ));
  const style = {
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0',
    left: '0',
    border: '10px solid gray',
    zIndex: '1',
  };

  return <VisualCircles style={style} points={points.POINTERS} />;
};

export default VisualizeTouches;
