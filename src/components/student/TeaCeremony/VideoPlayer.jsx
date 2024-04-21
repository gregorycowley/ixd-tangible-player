// VideoPlayer.jsx
/* 
  This component is intentionally minimal. The use of ForwardRef
  appears to limit to add imperative methods.
*/
import React, { forwardRef } from 'react';

const VideoPlayer = forwardRef((props , ref) => {

  return (
    <video style={props.style} ref={ref} src={props.src} width="640" autoPlay loop>
      Your browser does not support the video tag.
    </video>
  );
});

export default VideoPlayer;