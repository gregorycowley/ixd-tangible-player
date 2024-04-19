import React, { StrictMode, useEffect, useState } from 'react';
import { TEContext } from './components/TEContext.js';
import TeaCeremony from './components/tea-ceremony/TeaCeremony.jsx';
import Puck from './components/puck-proxies/puck/Puck.jsx';
import PuckManager from './components/puck-proxies/PuckManager.jsx';

function App() {
  const [puckParams, setPuckParams] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const handleUpdate = (e, response) => {
      setPuckParams({ x: e.clientX, y: e.clientY });
      console.log('TE Update', e, response);
    };
    TEContext.addEventListener('update', handleUpdate);
    return () => {
      TEContext.removeEventListener('update', handleUpdate);
    };
  }, []);
  return (
    <TEContext.Provider value={puckParams}>
      <PuckManager>
        <Puck color={'red'}></Puck>
      </PuckManager>
    </TEContext.Provider>
    // <StrictMode>
    //   <TeaCeremony>{/* <Puck></Puck> */}</TeaCeremony>
    // </StrictMode>
  );
}

export default App;
