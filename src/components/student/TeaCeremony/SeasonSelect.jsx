// SeasonSelect component for selecting the season of the tea ceremony
import React, { useContext } from 'react';
import springData from '../../../../data/A0_120_50.json';
import summerData from '../../../../data/C7_120_70.json';
import fallData from '../../../../data/D1_135_50.json';
import winterData from '../../../../data/E2_135_60.json';
// import { TEContext } from '../TEContext.js';

const SeasonSelect = ({ onSeasonSelect }) => {
  // const te = useContext(TEContext);
  const selectStyle = {
    position: 'absolute',
    pointerEvents: 'none',
  };

  const selectTextStyle = {
    position: 'absolute',
    padding: '0',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: '2em',
    margin: '0 auto',
    // backgroundColor: 'rgba(0, 167, 157, 0.5)',
    pointerEvents: 'auto',
    left: '0',
    top: '700px',
    transform: 'translate(0, -50%)',
    borderRadius: '0',
  };

  const h2Style = {
    cursor: 'pointer',
    backgroundColor: 'rgba(0, 167, 157, 0.2)',
    margin: '40px 0 40px 0',
    padding: '30px 15px',
  };

  const handleClick = (e) => {
    const selection = e.target.innerText;
    switch (selection) {
      case 'Sp':
        springData.Type = 'ForceA';
        window.electronAPI.sendCommandToTE(springData);
        onSeasonSelect('spring');
        break;
      case 'Su':
        summerData.Type = 'ForceC';
        window.electronAPI.sendCommandToTE(summerData);
        onSeasonSelect('summer');
        break;
      case 'Fa':
        fallData.Type = 'ForceD';
        window.electronAPI.sendCommandToTE(fallData);
        onSeasonSelect('fall');
        break;
      case 'Wi':
        winterData.Type = 'ForceE';
        window.electronAPI.sendCommandToTE(winterData);
        onSeasonSelect('winter');
        break;
      default:
        break;
    }
  };

  return (
    <div id="season_select" style={selectStyle}>
      <div className="season-select-text" style={selectTextStyle}>
        <h2 style={h2Style} onClick={handleClick}>
          Sp
        </h2>
        <h2 style={h2Style} onClick={handleClick}>
          Su
        </h2>
        <h2 style={h2Style} onClick={handleClick}>
          Fa
        </h2>
        <h2 style={h2Style} onClick={handleClick}>
          Wi
        </h2>
      </div>
    </div>
  );
};

export default SeasonSelect;
