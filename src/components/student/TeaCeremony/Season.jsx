// Season.jsx
import React, {useState} from 'react';
import Background from './Background.jsx';
import ClickAnimation from './ClickAnimation.jsx';
import SeasonSelect from './SeasonSelect.jsx';

const Season = () => {
  const [selectedSeason, setSelectedSeason] = useState('Spring');

  const handleSeasonSelect = (season) => {
    console.log('handleSeasonSelect', season);
    setSelectedSeason( season);
  };

  return (
    <>
      <Background season={selectedSeason}/>
      <ClickAnimation season={selectedSeason} />
      <SeasonSelect onSeasonSelect={handleSeasonSelect}/>
    </>
  );
};

export default Season;