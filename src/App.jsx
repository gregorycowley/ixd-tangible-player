import React, { StrictMode } from 'react';
import PuckTray from './components/puck-proxies/PuckTray.jsx';

// Example object with various parameters
const exampleObject = {
  name: 'John Doe',
  age: '30',
  occupation: 'Software Developer',
  country: 'USA'
};

function App() {
  return (
    <StrictMode>
      <PuckTray/>
    </StrictMode>
  );
}

export default App;