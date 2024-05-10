import React, { useRef, useState } from 'react';
import AudioPlayer from './AudioPlayer.jsx';

import springSrc from './assets/sounds/Spring_Birds.wav';
import summerSrc from './assets/sounds/Summer_Waterdrops.wav';
import fallSrc from './assets/sounds/Fall_Leaves.wav';
import winterSrc from './assets/sounds/Winter_Snow.wav';

function AmbientAudio({ season, ui = true }) {
  // Reference to the audio element
  const audioRef = useRef(null);

  // console.log('AmbientAudio season:', season);

  // State to manage whether the audio should loop
  const [loop, setLoop] = useState(false);
  let src = null;
  switch (season) {
    case 'spring':
      src = springSrc;
      break;
    case 'summer':
      src = summerSrc;
      break;
    case 'fall':
      src = fallSrc;
      break;
    case 'winter':
      src = winterSrc;
      break;
    default:
      src = summerSrc;
  }

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
      <AudioPlayer ui={ui} ref={audioRef} src={src} autoplay={true} />
    </div>
  );
}

export default AmbientAudio;
