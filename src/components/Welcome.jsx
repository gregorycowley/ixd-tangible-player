import React from "react";
import styled from 'styled-components';

const BlueText = styled.h1`
  color: blue;
`;

function Welcome() {
  return (
    <div>
      <BlueText>💖 Hello World!</BlueText>
      <p>Welcome to your Electron application.</p>
    </div>
  );
}

export default Welcome;