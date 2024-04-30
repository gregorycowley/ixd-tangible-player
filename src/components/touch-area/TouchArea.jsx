import React, { useState, useContext, useEffect } from 'react';
import { TEContext } from '../../contexts/TEContext.js';
import TouchListener from './TouchListener.jsx';

const touchList = [];

// distinguish between touch and tangible
// Use the context for data

const TouchArea = () => {
  const tangibles = useContext(TEContext);
  const [tangibleList, setTangibleList] = useState([]);

  useEffect(() => {
    if (tangibles.TANGIBLES && tangibles.TANGIBLES.length > 0) {
      // console.log('Touch Area Received', tangibles.TANGIBLES);
      tangibles.TANGIBLES.map((i) => console.log(i));

      // tangibles.TANGIBLES.map((tangible) => {
      //   const id = tangible.Id;
      //   const puck = {id:tangible.Id, x:tangible.X, y:tangible.Y,r:tangible.R};
      //   if (id !== undefined){
      //     console.log(Object.keys(tangibleList))
      //     if (!Object.keys(tangibleList).includes(id)){
      //       const newList = tangibleList;
      //       const obj = {};
      //       obj[id] = puck;
      //       newList.push(obj);
      //       console.log(newList);
      //       setTangibleList(newList)
      //     }
      //   }
      //   // console.log(tangibleList);
      // })
    }
  }, [tangibles, tangibleList]);
  return (
    <>
      <TouchListener />
      <div id="touch-area"></div>;
    </>
  );
};

export default TouchArea;
