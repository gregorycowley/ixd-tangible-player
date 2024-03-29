import React from "react";
import styled from 'styled-components';
// https://styled-components.com/

const RedText = styled.div`
  color: red;
  font-size: 32px;
`;

export function Puck() {
  return (
    <div>
      <RedText> <h1>A Puck</h1></RedText>
    </div>
  );
}
