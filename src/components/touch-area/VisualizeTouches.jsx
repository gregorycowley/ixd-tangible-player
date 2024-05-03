import React, { useContext } from 'react';
import VisualCircles from './VisualCircles.jsx';
import { TEContext } from '../../contexts/TEContext.js';

const VisualizeTouches = () => {
  const { pointers } = useContext(TEContext);
  console.log('VisualizeTouches', pointers);

  const style = {
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0',
    left: '0',
    border: '10px solid gray',
    zIndex: '1',
  };

  return <VisualCircles style={style} points={pointers || []} />;
};

export default VisualizeTouches;
