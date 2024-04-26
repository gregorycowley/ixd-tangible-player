import React from 'react';
import TeaCeremony from '../components/student/TeaCeremony';
import Operation from '../components/student/Operation';
import TouchGraphics from '../components/touch-area/TouchGraphics.jsx';
import TouchListener from '../components/touch-area/TouchListener.jsx';
import TouchMarker from '../components/touch-area/TouchMarker.jsx';
import TouchArea from '../components/touch-area/TouchArea.jsx';

const AppContainer = () => {
  return (
    <div>
      {true && <TouchArea />}
      {false && <TouchMarker />}
      {false && <TouchListener />}
      {false && <TouchGraphics />}
      {false && <Operation />}
      {false && <TeaCeremony />}
      {false && <div>No component selected</div>}
    </div>
  );
};

export default AppContainer;
