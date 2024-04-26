import React, { useState, useContext, useEffect } from 'react';
import { TEContext } from '../TEContext.js';
import TouchListener from './TouchListener.jsx';

const tangibleList = [];
const touchList = [];

// distinguish between touch and tangible
// Use the context for data

const TouchArea = () => {
  const tangibles = useContext(TEContext);

  useEffect(() => {
    console.log('Touch Area Received', tangibles);
  }, [tangibles]);
  return (
    <>
      <TouchListener />
      <div id="touch-area"></div>;
    </>
  );
};

export default TouchArea;
