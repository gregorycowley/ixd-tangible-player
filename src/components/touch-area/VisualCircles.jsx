import React from 'react';
import config from '../../config/config.json';

const VisualCircles = ({ style, points }) => {
  // Function to generate SVG circles
  const svgCircles = points.map((point, index) => (
    <circle key={index} cx={point.X} cy={point.Y} r="20" fill="red" />
  ));

  return (
    <svg width={config.screenWidth} height={config.screenHeight} style={style}>
      {svgCircles}
    </svg>
  );
};

export default VisualCircles;
