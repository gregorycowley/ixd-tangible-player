import React, { useRef, useState } from 'react';
import AudioPlayer from './AudioPlayer.jsx';

<<<<<<< HEAD
function AmbientAudio () {
  // Reference to the audio element
  const audioRef = useRef(null);
  
  // State to manage whether the audio should loop
  const [loop, setLoop] = useState(false);

  // Function to play the audio
  const playAudio = () => {
    audioRef.current.play();
  };

=======
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

>>>>>>> tea-ceremony-release
  // Function to toggle looping
  const toggleLoop = () => {
    setLoop(!loop);
  };

  return (
    <div>
<<<<<<< HEAD
      <audio ref={audioRef} src="sample-audio.mp3" loop={loop} />
      <button onClick={playAudio}>Play Audio</button>
      <div>
        <label>
          <input type="checkbox" checked={loop} onChange={toggleLoop} />
          Loop playback
        </label>
      </div>
=======
      <AudioPlayer ref={audioRef} src={src} autoplay={true} />
>>>>>>> tea-ceremony-release
    </div>
  );
}

export default AmbientAudio;
