import React, { useState, useContext, useEffect } from 'react';
import { TEContext } from '../../contexts/TEContext.js';
import TouchListener from './TouchListener.jsx';
import TangibleSvg from './TangibleSvg.jsx';
import VisualizeTouches from './VisualizeTouches.jsx';
import TangibleTriangles from './TangibleTriangles.jsx';

// distinguish between touch and tangible
// Use the context for data

const TouchArea = () => {
  const [tangibleList, setTangibleList] = useState({});
  const { tangibles = [], pointers, status } = useContext(TEContext);

  // if (!status) console.log('TouchArea Status::', status);

  useEffect(() => {
    // console.log('Touch Area Received', tangibles);
    let newList = {};
    if (tangibles && tangibles.length > 0) {
      console.log('Touch Area Received', tangibles);
      tangibles.map((tang) => {
        const id = tang.PatternId;
        const puck = { id: tang.PatternId, x: tang.X, y: tang.Y, r: tang.R };
        // console.log('Tangible List: ', id, Object.keys(cTangibleList));
        if (id !== undefined) {
          if (newList[id] === undefined) {
            newList[id] = puck;
            setTangibleList(newList);
          }
        }
      });
    }
    // console.log('tangibleList', tangibleList);
  }, [tangibles]);

  return (
    <>
      <TouchListener />
      <VisualizeTouches />
      <div id="touch-area">
        {Object.keys(tangibleList).map((key, index) => (
          <TangibleSvg key={key} props={tangibleList[key]}></TangibleSvg>
        ))}
      </div>
      <TangibleTriangles />
    </>
  );
};

export default TouchArea;
