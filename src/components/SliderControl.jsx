import React, { useState } from 'react';
import ScaleComponent1 from './ScaleComponent1';
import ScaleComponent2 from './ScaleComponent2';
import ScaleComponent3 from './ScaleComponent3';

const SliderControl = () => {
  const [scale1, setScale1] = useState(1);
  const [scale2, setScale2] = useState(1);
  const [scale3, setScale3] = useState(1);

  return (
    <div>
      <div>
        <input type="range" min="0.5" max="3" step="0.1" value={scale1} onChange={(e) => setScale1(e.target.value)} />
        <p>Scale 1: {scale1}</p>
      </div>
      <div>
        <input type="range" min="0.5" max="3" step="0.1" value={scale2} onChange={(e) => setScale2(e.target.value)} />
        <p>Scale 2: {scale2}</p>
      </div>
      <div>
        <input type="range" min="0.5" max="3" step="0.1" value={scale3} onChange={(e) => setScale3(e.target.value)} />
        <p>Scale 3: {scale3}</p>
      </div>
      <ScaleComponent1 scale={scale1} />
      <ScaleComponent2 scale={scale2} />
      <ScaleComponent3 scale={scale3} />
    </div>
  );
};

export default SliderControl;
