import React, { useState, useRef } from 'react';

const DivTracker = () => {
  const [divsData, setDivsData] = useState({});
  const exportRef = useRef(null);

  // Example divs for demonstration. Replace with your actual method of rendering and tracking divs.
  const divs = [
    { id: 'div1', x: 100, y: 100, rotation: 0 },
    { id: 'div2', x: 200, y: 200, rotation: 45 },
    // Add more divs as needed
  ];

  const captureDivPositionsAndRotations = () => {
    // In a real scenario, you would capture these values dynamically,
    // possibly using refs or another method to get the current position and rotation.
    // Here, we're using static values for demonstration.
    const newData = divs.reduce((acc, div) => {
      acc[div.id] = { x: div.x, y: div.y, rotation: div.rotation };
      return acc;
    }, {});

    setDivsData(newData);
  };

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(divsData));
    exportRef.current.setAttribute("href", dataStr);
    exportRef.current.setAttribute("download", "divsData.json");
    exportRef.current.click();
  };

  return (
    <div>
      <button onClick={captureDivPositionsAndRotations}>Capture Divs Data</button>
      <button onClick={downloadJSON}>Download JSON</button>
      <a ref={exportRef} style={{ display: 'none' }}>Download</a>
      {/* Render your divs based on divs array or your application's structure */}
    </div>
  );
};

export default DivTracker;
