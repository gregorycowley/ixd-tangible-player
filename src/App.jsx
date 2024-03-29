import React from "react";
import Button from '@mui/material/Button';
import { Puck } from './components/Puck.jsx';
import Welcome from './components/Welcome.jsx';

function App() {
  return (
    <div>
      <Welcome></Welcome>
      <Button variant="contained">Hello world</Button>
      <Puck></Puck>
    </div>
  );
}

export default App