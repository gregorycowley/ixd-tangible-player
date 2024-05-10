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
      (point) => `${point.X},${point.Y}`
    ).join(' ');
    const posX = 300 + (200 * count);
    const posY = 300;
    // console.log('TangibleTriangles:: pointsAttribute', pointsAttribute);
    count++;
    return (
      <g key={index} transform={`translate(${posX}, ${posY})`}>
        <polygon
          
          points={pointsAttribute}
          fill="limegreen"
          stroke="black"
          strokeWidth="2"
        />
        <text x="40" y="40" fontFamily="Arial" fontSize="40" fill="white" textAnchor="middle" dominantBaseline="middle">
                {pattern.PatternId}
        </text>
      </g>
    );
  });

  return (
    <svg width={config.screenWidth} height={config.screenHeight} style={style}>
      {svgTriangles}
    </svg>
  );
};

export default TangibleTriangles;
