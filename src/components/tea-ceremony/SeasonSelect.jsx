// SeasonSelect component for selecting the season of the tea ceremony
import React from 'react';

const SeasonSelect = ({onSeasonSelect}) => {
  const selectStyle = {
    position: 'absolute',
    pointerEvents: 'none'
  };

  const selectTextStyle = {
    position: 'absolute',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: '2em',
    margin: '0 auto',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    pointerEvents: 'auto',
    left: '960px',
    top: '500px',
    transform: 'translate(-50%, -50%)',
    borderRadius: '30px',
  };

  const handleClick = (e) => {
    onSeasonSelect(e.target.innerText);
  };

  return (
    <div id="season_select" style={selectStyle}>
      <div className="season-select-text" style={selectTextStyle}>
        <h2 onClick={handleClick}>Spring</h2>
        <h2 onClick={handleClick}>Summer</h2>
        <h2 onClick={handleClick}>Fall</h2>
        <h2 onClick={handleClick}>Winter</h2>
      </div>
    </div>
  );
};

export default SeasonSelect;