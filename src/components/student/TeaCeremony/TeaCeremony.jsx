import React, { useContext, useEffect, useState } from 'react';
import AmbientAudio from './AmbientAudio.jsx';
import Background from './Background.jsx';
import ClickAnimation from './ClickAnimation.jsx';
import SeasonSelect from './SeasonSelect.jsx';
import { TEContext } from '../../../contexts/TEContext.js';
import TouchListener from '../../touch-area/TouchListener.jsx';

const TeaCeremony = ({ children }) => {
  const [selectedSeason, setSelectedSeason] = useState('idle');
  const pucks = useContext(TEContext);

  const onSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  useEffect(() => {
    if (pucks.TANGIBLES !== undefined) {
      // console.log('-----> pucks', pucks.TANGIBLES[0].PatternId);
      if (pucks.TANGIBLES[0].PatternId == 3) {
        setSelectedSeason('spring');
      }
    }
  }, [pucks]);

  return (
    <div>
      <Background season={selectedSeason}></Background>
      <ClickAnimation season={selectedSeason} />
      <SeasonSelect onSeasonSelect={onSeasonSelect}></SeasonSelect>
      {/* <Season season={selectedSeason}></Season> */}
      <AmbientAudio ui={false} season={selectedSeason}></AmbientAudio>
      <TouchListener />
      {children}
    </div>
  );
};

export default TeaCeremony;
