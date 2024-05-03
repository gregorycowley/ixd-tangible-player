import React from 'react';
import profile from '../../../data/GC_profile.json';
import config from '../../config/config.json';

const TangibleTriangles = () => {
  const patterns = profile.Patterns;

  // Create the points string for the 'points' attribute in the SVG polygon element

  const style = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    zIndex: 100,
  };
  let count = 0;
  const svgTriangles = patterns.map((pattern, index) => {
    const pointsAttribute = pattern.Points.map(
      (point) => `${point.X + 200 * count + 100},${point.Y + 300}`
    ).join(' ');
    console.log('TangibleTriangles:: pointsAttribute', pointsAttribute);
    count++;
    return (
      <polygon
        key={index}
        points={pointsAttribute}
        fill="limegreen"
        stroke="black"
        strokeWidth="2"
      />
    );
  });

  return (
    <svg width={config.screenWidth} height={config.screenHeight} style={style}>
      {svgTriangles}
    </svg>
  );
};

export default TangibleTriangles;
