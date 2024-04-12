import React from 'react';
// import DataViewer from './components/DataViewer.js';
// import Button from '@mui/material/Button';
// import Season from './components/tea-ceremony/Season.jsx';
import PuckTray from './components/puck-proxies/PuckTray.jsx';
// import Welcome from './components/Welcome.jsx';

// Example object with various parameters
const exampleObject = {
  name: 'John Doe',
  age: '30',
  occupation: 'Software Developer',
  country: 'USA'
};

function App() {
  return (
    <>
      {/* <Button></Button>
      <DataViewer dataObject={exampleObject} /> */}
      {/* <Season /> */}
      <PuckTray />
    </>
  );
}

export default App;