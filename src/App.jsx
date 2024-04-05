import React from 'react';
import DataViewer from './components/DataViewer.js';
import Button from '@mui/material/Button';
// import { Puck } from './components/Puck.jsx';
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
    <div>
      <Button></Button>
      <DataViewer dataObject={exampleObject} />
    </div>
  );
}

export default App;