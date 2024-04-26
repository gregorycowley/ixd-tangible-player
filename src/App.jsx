import React, { StrictMode, useState, useEffect } from 'react';
import AppContainer from './containers/AppContainer.jsx';
import { TEContext } from './components/TEContext.js';

function App() {
  const [pucks, setPucks] = useState([{ state: 'initial' }]);

  useEffect(() => {
    console.log("registering listener")
    window.electronAPI.onTangibleEngineUpdate((tangibleData) => {
      // console.log("Puck Data :",tangibleData)
      setPucks(tangibleData);
    });
  }, []);

  return (
    <StrictMode>
      <TEContext.Provider value={pucks}>
        <AppContainer></AppContainer>
      </TEContext.Provider>
    </StrictMode>
  );
}

export default App;
