import React from 'react';
import TeaCeremony from '../components/student/TeaCeremony';
import Operation from '../components/student/Operation';

const AppContainer = () => {
  return (
    <div>
      {true && <Operation />}
      {false && <TeaCeremony />}
      {false && <div>No component selected</div>}
    </div>
  );
};

export default AppContainer;
