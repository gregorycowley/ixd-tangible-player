// Background.jsx

import React from 'react';
import VideoPlayer from './VideoPlayer.jsx';
// import withVideoTimeTracker from './withVideoTimeTracker.jsx';
import video from './assets/bgs/Spring_video.mov';

// const VideoWithTimeTracker = withVideoTimeTracker(VideoPlayer);

const Background = () => {
  return (
    <div>
      <VideoPlayer src={video} />
    </div>
  );
};

export default Background;