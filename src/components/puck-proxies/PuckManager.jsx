import React, { useContext } from 'react';
import { TEContext } from '../TEContext.js';

const PuckManager = ({ children }) => {
  const theme = useContext(TEContext);
  console.log('PuckManager', theme);
  return (
    <div>
      PuckManager
      {children}
    </div>
  );
};

export default PuckManager;
