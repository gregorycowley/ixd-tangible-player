import React, { StrictMode, useState, useEffect } from 'react';
import AppContainer from './containers/AppContainer.jsx';
import { TEProvider } from './contexts/TEContext.js';

function App() {
  return (
    <StrictMode>
      <TEProvider>
        <AppContainer></AppContainer>
      </TEProvider>
    </StrictMode>
  );
}

export default App;
