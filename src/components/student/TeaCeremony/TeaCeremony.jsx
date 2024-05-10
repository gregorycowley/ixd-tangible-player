import React, { useContext, useEffect, useState } from 'react';
import AmbientAudio from './AmbientAudio.jsx';
import Background from './Background.jsx';
import ClickAnimation from './ClickAnimation.jsx';
import SeasonSelect from './SeasonSelect.jsx';
import { TEContext } from '../../../contexts/TEContext.js';
import TouchListener from '../../touch-area/TouchListener.jsx';
import TangibleTriangles from '../../touch-area/TangibleTriangles.jsx';

const TeaCeremony = ({ children }) => {
  const [selectedSeason, setSelectedSeason] = useState('idle');
  const { tangibles, pointers, status } = useContext(TEContext);

  const onSeasonSelect = (season) => {
    console.log('onSeasonSelect', season);
    // setSelectedSeason(season);
  };

  useEffect(() => {
    console.log('-----> tangibles', tangibles);
    if (tangibles !== undefined && tangibles != null && tangibles.length > 0) {
      // console.log('-----> tangibles', tangibles[0]);
      // A0 C7 D1 E2
      if (tangibles[0].PatternId == 0) {
        setSelectedSeason('spring');
      } else if (tangibles[0].PatternId == 7) {
        setSelectedSeason('summer');
      } else if (tangibles[0].PatternId == 1) {
        setSelectedSeason('fall');
      } else if (tangibles[0].PatternId == 2) {
        setSelectedSeason('winter');
      }
    }
  }, [tangibles]);

  return (
    <div>
      <Background season={selectedSeason}></Background>
      <ClickAnimation season={selectedSeason} />
      <SeasonSelect onSeasonSelect={onSeasonSelect}></SeasonSelect>
      {/* <Season season={selectedSeason}></Season> */}
      <AmbientAudio ui={false} season={selectedSeason}></AmbientAudio>
      {/* <TouchListener /> */}
      {/* <TangibleTriangles />  */}
      {children}
    </div>
  );
};

export default TeaCeremony;
