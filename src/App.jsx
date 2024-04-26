import React, { StrictMode, useState, useEffect } from 'react';
import AppContainer from './containers/AppContainer.jsx';
import { TEContext } from './components/TEContext.js';

function App() {
  const [pucks, setPucks] = useState([{ state: 'initial' }]);

  useEffect(() => {
    window.electronAPI.onTangibleEngineUpdate((tangibleData) => {
      setPucks(tangibleData);
    });
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
