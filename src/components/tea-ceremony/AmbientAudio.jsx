import React, { useRef, useState } from 'react';
import AudioPlayer from './AudioPlayer.jsx';

function AmbientAudio () {
  // Reference to the audio element
  const audioRef = useRef(null);
  
  // State to manage whether the audio should loop
  const [loop, setLoop] = useState(false);

  // Function to play the audio
  const playAudio = () => {
    audioRef.current.play();
  };

  // Function to toggle looping
  const toggleLoop = () => {
    setLoop(!loop);
  };

  return (
    <div>
      <audio ref={audioRef} src="sample-audio.mp3" loop={loop} />
      <button onClick={playAudio}>Play Audio</button>
      <div>
        <label>
          <input type="checkbox" checked={loop} onChange={toggleLoop} />
          Loop playback
        </label>
      </div>
    </div>
  );
}

export default AmbientAudio;
