import React, { useRef, useState } from 'react';
import AudioPlayer from './AudioPlayer.jsx';

import springSrc from './assets/sounds/Spring_Birds.wav';
import summerSrc from './assets/sounds/Summer_waterdrops.wav';
import fallSrc from './assets/sounds/fall_leaves.wav';
import winterSrc from './assets/sounds/Winter_Snow.wav';

function AmbientAudio({ season }) {
  // Reference to the audio element
  const audioRef = useRef(null);

  console.log('AmbientAudio season:', season);

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
      <AudioPlayer ref={audioRef} src={src} autoplay={true} />
    </div>
  );
}

export default AmbientAudio;
