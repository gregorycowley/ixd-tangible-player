import React, { useState, useContext, useEffect } from 'react';
import { TEContext } from '../../contexts/TEContext.js';
import TouchListener from './TouchListener.jsx';
// import tangibleSvg from './SVG/tangible.svg';
import TangibleSvg from './TangibleSvg.jsx';

// const touchList = [];

// distinguish between touch and tangible
// Use the context for data

const TouchArea = () => {
  // const tangibles = useContext(TEContext);
  const [tangibleList, setTangibleList] = useState([]);

  useEffect(() => {
    const tangibles = {
      TYPE: 3,
      PATTERNS: null,
      TANGIBLES: [
        {
          Id: 0,
          PatternId: 3,
          R: 1.80751479,
          RMSNormalized: -0.112968467,
          PointerIds: [-1, 0, -1],
          Pos: { x: 611.1252, y: 348.0896 },
          X: 611.1252,
          Y: 348.0896,
        },
        {
          Id: 1,
          PatternId: 8,
          R: -1.16494775,
          RMSNormalized: 2.23793268,
          PointerIds: [1, 0, 2],
          Pos: { x: 467.333344, y: 589.3334 },
          X: 467.333344,
          Y: 589.3334,
        },
      ],
      POINTERS: null,
      STATUS: true,
      DEBUG_TEXT: null,
      ID: 0,
    };
    if (tangibles.TANGIBLES && tangibles.TANGIBLES.length > 0) {
      // console.log('Touch Area Received', tangibles.TANGIBLES);
      tangibles.TANGIBLES.map((tang) => {
        const id = tang.PatternId;
        const puck = { id: tang.PatternId, x: tang.X, y: tang.Y, r: tang.R };
        console.log('Tangible List: ', id, Object.keys(tangibleList));
        if (id !== undefined) {
          if (tangibleList[id] === undefined) {
            const newList = tangibleList;
            newList[id] = puck;
            setTangibleList(newList);
          }
        }
      });
    }
  }, []);
  return (
    <>
      <TouchListener />
      <div id="touch-area">
        {tangibleList.map((t, index) => (
          <TangibleSvg key={index} props={t}></TangibleSvg>
        ))}
      </div>
    </>
  );
};

export default TouchArea;
