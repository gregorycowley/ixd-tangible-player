// Background.jsx

import React from 'react';
import VideoPlayer from './VideoPlayer.jsx';
import withVideoTimeTracker from './withVideoTimeTracker.jsx';

import VideoIdle from './assets/bgs/Idle_video_1.mov';
import VideoSpring from './assets/bgs/Spring_video.mov';
import VideoSummer from './assets/bgs/Summer_video.mov';
import VideoFall from './assets/bgs/Fall_video.mov';
import VideoWinter from './assets/bgs/Winter_video.mov';

const VideoWithTimeTracker = withVideoTimeTracker(VideoPlayer);

const backgroundStyle = {
  position: 'fixed',
  zIndex: '-1',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: 'blue',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const videoStyle = {
  color: 'red',
  backgroundColor: 'DodgerBlue',
  padding: '0',
  fontFamily: 'Arial',
  width: '100%',
  height: '100vh',
  objectFit: 'fill',
};

const Background = ({ season = 'idle' }) => {
  let bgVideo = VideoSpring;

  // console.log('Background', season);

  switch (season.toUpperCase()) {
    case 'IDLE':
      bgVideo = VideoIdle;
      break;
    case 'SPRING':
      bgVideo = VideoSpring;
      break;
    case 'SUMMER':
      bgVideo = VideoSummer;
      break;
    case 'AUTUMN':
      bgVideo = VideoFall;
      break;
    case 'FALL':
      bgVideo = VideoFall;
      break;
    case 'WINTER':
      bgVideo = VideoWinter;
      break;
    default:
  }

  return (
    <div id="background" style={backgroundStyle}>
      <VideoWithTimeTracker style={videoStyle} src={bgVideo} />
    </div>
  );
};

export default Background;
