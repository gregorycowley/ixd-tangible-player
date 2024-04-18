import React, { useContext, useEffect, useState } from 'react';
import { TEContext } from '../TEContext.js';
import AmbientAudio from './AmbientAudio.jsx';
import EventAudio from './EventAudio.jsx';
import Background from './Background.jsx';
import SeasonSelect from './SeasonSelect.jsx';
import eventEmitter from '../EventManager.js';

const TeaCeremony = ({ children }) => {
  const [selectedSeason, setSelectedSeason] = useState('idle');
  const te = useContext(TEContext);

  useEffect(() => {
    te.run();
    return () => {
      te.stop();
    };
  }, [te]);

  const onSeasonSelect = (season) => {
    te.setSeason(season);
    console.log('Season selected:', season);
  };

  useEffect(() => {
    const handleSelectSeason = (season) => {
      console.log('Received custom event:', season);
      setSelectedSeason(season);
    };

    eventEmitter.on('seasonChange', handleSelectSeason);
    return () => {
      eventEmitter.removeListener('seasonChange', handleSelectSeason);
    };
  }, [selectedSeason]);

  return (
    <div>
      <Background season={selectedSeason}></Background>
      <SeasonSelect onSeasonSelect={onSeasonSelect}></SeasonSelect>
      <AmbientAudio season={selectedSeason}></AmbientAudio>
      <EventAudio></EventAudio>
      {children}
    </div>
  );
};

export default TeaCeremony;
