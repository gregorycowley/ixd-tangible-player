import React, { useState, useEffect, useRef } from 'react';
import { Knob } from 'react-rotary-knob';

const VolumeControlDial = ({ audioSrc }) => {
  const [volume, setVolume] = useState(50); // Initial volume (0 to 100)
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleVolumeChange = (newValue) => {
    setVolume(newValue);
  };

  return (
    <div>
      <Knob
        value={volume}
        onChange={handleVolumeChange}
        min={0}
        max={100}
        step={1}
        style={{ width: '100px', height: '100px' }}
      />
      <audio ref={audioRef} src={audioSrc} controls autoPlay loop>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default VolumeControlDial;