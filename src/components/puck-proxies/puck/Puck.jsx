import React from 'react';
import styled from 'styled-components';
import puckFile from './puck.svg';

import puckFileOrange from './puck-orange.svg';
import puckFileGreen from './puck-green.svg';
import puckFileBlue from './puck-blue.svg';
import puckFilePurple from './puck-purple.svg';
import puckFileRed from './puck-red.svg';
import puckFileYellow from './puck-yellow.svg';

// https://styled-components.com/

const StyledPuck = styled.img`
  // width: 263px;
  // height: 263px;
  width: 150px;
  height: 150px;
`;

const Puck = ({ color }) => {
  let coloredPuck = puckFile;
  switch (color) {
    case 'orange':
      coloredPuck = puckFileOrange;
      break;
    case 'green':
      coloredPuck = puckFileGreen;
      break;
    case 'blue':
      coloredPuck = puckFileBlue;
      break;
    case 'purple':
      coloredPuck = puckFilePurple;
      break;
    case 'red':
      coloredPuck = puckFileRed;
      break;
    case 'yellow':
      coloredPuck = puckFileYellow;
      break;
    default:
  }
  // console.log('color:', coloredPuck);
  return <StyledPuck src={coloredPuck} alt={`${color} puck svg`} />;
};

export default Puck;
