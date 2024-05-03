import React, { useState, useContext, useEffect } from 'react';
import { TEContext } from '../../contexts/TEContext.js';
import TouchListener from './TouchListener.jsx';
// import tangibleSvg from './SVG/tangible.svg';
import TangibleSvg from './TangibleSvg.jsx';

// const touchList = [];

// distinguish between touch and tangible
// Use the context for data

const TouchArea = () => {
  const tangibles = useContext(TEContext);
  const [tangibleList, setTangibleList] = useState({});
  // let cTangibleList = {};
  useEffect(() => {
    console.log(tangibles);
    let newList = {};
    if (tangibles.TANGIBLES && tangibles.TANGIBLES.length > 0) {
      // console.log('Touch Area Received', tangibles.TANGIBLES);
      tangibles.TANGIBLES.map((tang) => {
        const id = tang.PatternId;
        const puck = { id: tang.PatternId, x: tang.X, y: tang.Y, r: tang.R };
        // console.log('Tangible List: ', id, Object.keys(cTangibleList));
        if (id !== undefined) {
          if (newList[id] === undefined) {
            // const tempList = newList;
            newList[id] = puck;
            // cTangibleList = newList;
            setTangibleList(newList);
          }
        }
      });
    }
    // console.log('tangibleList', tangibleList);
  }, [tangibles]);
  // console.log('Toucharea Redraw', tangibleList)
  return (
    <>
      <TouchListener />
      <div id="touch-area">
        {Object.keys(tangibleList).map((key, index) => (
          <TangibleSvg key={key} props={tangibleList[key]}></TangibleSvg>
        ))}
      </div>
    </>
  );
};

export default TouchArea;
