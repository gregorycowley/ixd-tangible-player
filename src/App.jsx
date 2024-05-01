import React, { StrictMode, useState, useEffect } from 'react';
import AppContainer from './containers/AppContainer.jsx';
import { TEContext } from './contexts/TEContext.js';

function App() {
  const [pucks, setPucks] = useState([{ state: 'initial' }]);

  useEffect(() => {
    console.log('registering listener');
    const callback = (tangibleData) => {
      console.log('Puck Data :', tangibleData);
      setPucks(tangibleData);
    };
    window.electronAPI.onTangibleEngineUpdate(callback);
  }, [pucks]);

  return (
    <StrictMode>
      <TEContext.Provider value={pucks}>
        <AppContainer></AppContainer>
      </TEContext.Provider>
    </StrictMode>
  );
}

export default App;
