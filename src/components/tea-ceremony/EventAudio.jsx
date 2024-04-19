import React, { useRef, useState } from 'react';
import AudioPlayer from './AudioPlayer.jsx';

import eventSrc from './assets/sounds/Effects.wav';

function EventAudio({ season }) {
  // Reference to the audio element
  const audioRef = useRef(null);

  const [loop, setLoop] = useState(false);
  let src = eventSrc;

  // Function to play the audio
  const play = () => {
    audioRef.current.play();
  };

  const stop = () => {
    audioRef.current.pause();
  };

  // Function to toggle looping
  const toggleLoop = () => {
    setLoop(!loop);
  };

  return (
    <div>
      <AudioPlayer ref={audioRef} src={src} />
    </div>
  );
}

export default EventAudio;