import React, { createContext, useState, useEffect } from 'react';
import TeaCeremony from '../components/student/TeaCeremony';
import Operation from '../components/student/Operation';
import TouchGraphics from '../components/TouchGraphics.jsx';
import { TEContext } from '../components/TEContext.js';
import TouchListener from '../components/TouchListener.jsx';
import TouchMarker from '../components/TouchMarker.jsx';

const AppContainer = () => {
  const [pucks, setPucks] = useState([{ state: 'initial' }]);

  useEffect(() => {
    window.electronAPI.onTangibleEngineUpdate((tangibleData) => {
      setPucks(tangibleData);
    });
  }, []);

  return (
    <TEContext.Provider value={pucks}>
      <div>
        {true && <TouchMarker />}
        {false && <TouchListener />}
        {false && <TouchGraphics />}
        {false && <Operation />}
        {false && <TeaCeremony />}
        {false && <div>No component selected</div>}
      </div>
    </TEContext.Provider>
  );
};

export default AppContainer;
