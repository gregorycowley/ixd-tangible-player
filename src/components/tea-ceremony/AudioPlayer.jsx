import React, { useRef, useState, forwardRef } from 'react';

const AudioPlayer = forwardRef(({ src, autoplay, ui = true }, audioRef) => {
  const [loop, setLoop] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  const play = () => {
    audioRef.current.play();
  };

  const stop = () => {
    audioRef.current.pause();
  };

  // const playAudio = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play();
  //   }
  // };

  // const stopAudio = () => {
  //   if (audioRef.current) {
  //     audioRef.current.pause();
  //     audioRef.current.currentTime = 0;
  //   }
  // };

  const fadeInAudio = () => {
    if (audioRef.current) {
      clearInterval(intervalId);
      audioRef.current.volume = 0;
      let volume = 0;
      const fadeSpeed = 0.05; // Adjust fade speed as needed

      const fade = setInterval(() => {
        if (volume < 1) {
          volume += fadeSpeed;
          audioRef.current.volume = volume;
        } else {
          clearInterval(fade);
        }
      }, 200);

      setIntervalId(fade);
    }
  };

  const fadeOutAudio = () => {
    if (audioRef.current) {
      clearInterval(intervalId);
      let volume = audioRef.current.volume;
      const fadeSpeed = 0.05; // Adjust fade speed as needed

      const fade = setInterval(() => {
        if (volume > 0) {
          volume -= fadeSpeed;
          audioRef.current.volume = volume;
        } else {
          clearInterval(fade);
          stopAudio(); // Optional: stop after fade out
        }
      }, 200);

      setIntervalId(fade);
    }
  };

  // Function to toggle looping
  const toggleLoop = () => {
    setLoop(!loop);
  };

  const uiDiv = `
    <button onClick={play}>Play Audio</button>
      <button onClick={stop}>Stop Audio</button>
      <br />
      <div>
        <label>
          <input type="checkbox" checked={loop} onChange={toggleLoop} />
          Loop
        </label>
      </div>
  `;

  const controlStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '70px',
    margin: '10px 5px',
  };

  return (
    <div style={controlStyle}>
      <audio ref={audioRef} src={src} loop={loop} preload="auto" autoPlay={autoplay} />
      {ui && uiDiv}
    </div>
  );
});

export default AudioPlayer;
