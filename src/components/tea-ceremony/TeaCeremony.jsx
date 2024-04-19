import React, { useRef, useEffect, useState } from 'react';
// import { TEContextAlt } from '../TEContext.js';
import AmbientAudio from './AmbientAudio.jsx';
import Background from './Background.jsx';
import ClickAnimation from './ClickAnimation.jsx';
import SeasonSelect from './SeasonSelect.jsx';
import eventEmitter from '../EventManager.js';

const TeaCeremony = ({ children }) => {
  const [selectedSeason, setSelectedSeason] = useState('idle');

  // const te = useContext(TEContextAlt);

  const onSeasonSelect = (season) => {
    // te.setSeason(season);
    // console.log('Season selected:', season);
    setSelectedSeason(season);
  };

  // useEffect(() => {
  //   console.log('Running TeaCeremony', te);
  //   te.run();
  //   return () => {
  //     te.stop();
  //   };
  // }, [te]);

  // useEffect(() => {
  //   const handleSelectSeason = (season) => {
  //     console.log('Received custom event:', season);
  //     setSelectedSeason(season);
  //   };

  //   eventEmitter.on('seasonChange', handleSelectSeason);
  //   return () => {
  //     eventEmitter.removeListener('seasonChange', handleSelectSeason);
  //   };
  // }, [selectedSeason, ref]);

  return (
    <div>
      <Background season={selectedSeason}></Background>
      <ClickAnimation season={selectedSeason} />
      <SeasonSelect onSeasonSelect={onSeasonSelect}></SeasonSelect>
      {/* <Season season={selectedSeason}></Season> */}
      <AmbientAudio ui={false} season={selectedSeason}></AmbientAudio>

      {children}
    </div>
  );
};

export default TeaCeremony;
