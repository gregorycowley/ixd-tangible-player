import React from 'react';
import styled from 'styled-components';

import bGoals from './assets/bGoals.svg';
import bPriorities from './assets/bPriorities.svg';
import bProfile from './assets/bProfile.svg';
import bSchedule from './assets/bSchedule.svg';

import indicator from './assets/indicator.svg';
import icon from './assets/icon.svg';
import puck from './assets/puck.svg';

const StyledPuckContainer = styled.div`
  position: absolute;
  border: thin solid red;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  // overflow: auto;
  width: 550px;
  height: 550px;
`;

const BaseImg = styled.img`
  position: absolute;
  display: flex;
`;

const StyledPuck = styled(BaseImg)`
  width: 550px;
  height: 550px;
`;

const StyledPuckPart1 = styled(BaseImg)`
  // width: 150px;
  // height: 150px;
`;
const StyledPuckPart2 = styled(BaseImg)`
  // width: 150px;
  // height: 150px;
`;
const StyledPuckPart3 = styled(BaseImg)`
  // width: 150px;
  // height: 150px;
`;
const StyledPuckPart4 = styled(BaseImg)`
  // width: 150px;
  // height: 150px;
`;

const StyledIndicator = styled(BaseImg)`
  width: 238px;
  height: 223px;
`;

const StyledIcon = styled(BaseImg)`
  // width: 150px;
  // height: 150px;
`;

const Puck1View = () => {
  return (
    <StyledPuckContainer id="puck-1">
      <StyledPuckPart1 src={bGoals}></StyledPuckPart1>
      <StyledPuckPart2 src={bPriorities}></StyledPuckPart2>
      <StyledPuckPart3 src={bProfile}></StyledPuckPart3>
      <StyledPuckPart4 src={bSchedule}></StyledPuckPart4>;
      <StyledIndicator src={indicator} alt="indicator" />
      <StyledIcon src={icon} alt="icon" />
    </StyledPuckContainer>
  );
};

export default Puck1View;
