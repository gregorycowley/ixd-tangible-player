
import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

const VideoPlayer = forwardRef((props , ref) => {
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => {
    getCurrentTime: () => videoRef.current.currentTime;
  });

  const handleKeyPress = (e) => {
    const video = videoRef.current;
    if (!video) return;
    switch (e.key) {
    case ' ':
      if (video.paused) video.play();
      else video.pause();
      break;
    case 'ArrowRight':
      video.currentTime += 10; // Fast forward 10 seconds
      break;
    case 'ArrowLeft':
      video.currentTime -= 10; // Rewind 10 seconds
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <video ref={videoRef} src={props.src} width="640" >
      Your browser does not support the video tag.
    </video>
  );
});

export default VideoPlayer;