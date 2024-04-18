import React, { StrictMode } from 'react';
import TeaCeremony from './components/tea-ceremony/TeaCeremony.jsx';
import Puck from './components/puck-proxies/puck/Puck.jsx';

function App() {
  return (
    <StrictMode>
      <TeaCeremony>{/* <Puck></Puck> */}</TeaCeremony>
    </StrictMode>
  );
}

export default App;
