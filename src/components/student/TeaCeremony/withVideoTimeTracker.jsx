import React, { useState, useEffect, useRef } from 'react';

// Our custom hook that handles time updates.
function useVideoTimecode(videoRef) {
  const [timecode, setTimecode] = useState('00:00:00');

  useEffect(() => {
    const video = videoRef.current;
    const update = () => {
      const currentTime = video.currentTime;
      const hours = Math.floor(currentTime / 3600)
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor((currentTime % 3600) / 60)
        .toString()
        .padStart(2, '0');
      const seconds = Math.floor(currentTime % 60)
        .toString()
        .padStart(2, '0');
      setTimecode(`${hours}:${minutes}:${seconds}`);
    };
    video.addEventListener('timeupdate', update);
    return () => {
      video.removeEventListener('timeupdate', update);
    };
  }, [videoRef]);

  return timecode;
}

// The HOC that wraps the VideoPlayer component.
const withVideoTimeTracker = (VideoPlayerComponent) => {
  return ({ src, ...props }) => {
    const videoPlayerRef = useRef(null);
    const timecode = useVideoTimecode(videoPlayerRef);

    return (
      <div style={{ position: 'relative' }}>
        <VideoPlayerComponent ref={videoPlayerRef} src={src} {...props} />
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            color: '#FFF',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '14px',
          }}>
          {timecode}
        </div>
      </div>
    );
  };
};

export default withVideoTimeTracker;

// function VideoTimeTracker(WrappedComponent) {

//   // const [currentTime, setCurrentTime] = useState(0);
//   const videoRef = useRef(null);

//   // useEffect(() => {
//   //   const video = videoRef.current;
//   //   // if (!video) return;
//   //   // const updateTime = () => setCurrentTime(video.currentTime);
//   //   // video.addEventListener('timeupdate', updateTime);
//   //   // return () => {
//   //   //   clearInterval(this.timerID);
//   //   //   video.removeEventListener('timeupdate', updateTime);
//   //   // };
//   // }, [videoRef]);

//   return (

//       {/* <div>Current Time: {formatTime(currentTime)}</div> */}
//       <WrappedComponent {...props} ref={videoRef} />

//   );
// }

// // Wrap VideoPlayer with the HOC
// const VideoPlayerWithTimecode = withTimecode(VideoPlayer);

// // Usage
// function App() {
//   return <VideoPlayerWithTimecode src="path/to/your/video.mp4" />;
// }

// Function to format seconds into HH:MM:SS

// function withVideoTimeTracker( WrappedComponent ) {
//   return <VideoTimeTracker (WrappedComponent);
// }

// const formatTime = (time) => {
//   const hours = Math.floor(time / 3600).toString().padStart(2, '0');
//   const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
//   const seconds = Math.floor(time % 60).toString().padStart(2, '0');
//   return `${hours}:${minutes}:${seconds}`;
// };
