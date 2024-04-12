import React from 'react';
import Puck from './puck/Puck.jsx';
import styled from 'styled-components';
import Draggable from '../behaviors/Draggable.jsx';
import Rotatable from '../behaviors/Rotateable.jsx';

// import withDraggable from '../behaviors/withDraggable.jsx';

// const DraggablePuck = withDraggable(Puck);

const StyledPuckTray = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 2;
  justify-content: space-around;
  padding: 0px 30px;
  margin: 0;
  background-color: #ccc;
  width: auto;
  max-width: 150px;
  height: 100vh;
`;

const PuckTray = () => {
  return (
    <>
      {/* <Draggable><Puck color="blue" /></Draggable> */}
      <Rotatable><Puck color="blue" /></Rotatable>
      {/* <Draggable><Puck color="green" /></Draggable>
      <Draggable><Puck color="orange" /></Draggable>
      <Draggable><Puck color="purple" /></Draggable>
      <Draggable><Puck color="red" /></Draggable>
      <Draggable><Puck color="yellow" /></Draggable> */}
      <StyledPuckTray />
    </>
  );
};

export default PuckTray;