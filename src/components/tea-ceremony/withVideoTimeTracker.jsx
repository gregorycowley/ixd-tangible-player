import React, { useState, useEffect, useRef } from 'react';

function VideoTimeTracker(WrappedComponent) {
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateTime = () => setCurrentTime(video.currentTime);
    video.addEventListener('timeupdate', updateTime);
    return () => {
      clearInterval(this.timerID);
      video.removeEventListener('timeupdate', updateTime);
    };
  }, [videoRef]);

  return (
    <div>
      {/* <div>Current Time: {formatTime(currentTime)}</div> */}
      <WrappedComponent {...this.props} ref={this.videoRef} />
    </div>
  );
}

// Function to format seconds into HH:MM:SS
const formatTime = (time) => {
  const hours = Math.floor(time / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

// const useTimer = () => {
//   this.timerID = setInterval(
//     () => this.tick(),
//     1000 // Update every second
//   );
// };

// const tick = () => {
//   if (this.videoRef.current && typeof this.videoRef.current.getCurrentTime === 'function') {
//     const currentTime = this.videoRef.current.getCurrentTime();
//     this.setState({
//       currentTime,
//     });
//     console.log(currentTime);
//   }
// };

// class VideoTimeTracker extends Component {
//   constructor(props) {
//     super(props);
//     this.videoRef = React.createRef();
//     this.state = { currentTime: 0 };
//   }

// componentDidMount() {

// }

// componentWillUnmount() {
    
// }

// tick() {
//   // Ensure the video ref is current and the method exists
//   if (this.videoRef.current && typeof this.videoRef.current.getCurrentTime === 'function') {
//     const currentTime = this.videoRef.current.getCurrentTime();
//     this.setState({
//       currentTime,
//     });

//     // Here, you can also do something with the currentTime
//     // For example, logging it or passing it up to a parent component via callback
//     console.log(currentTime);
//   }
// }

//   render() {
//     // Inject the video ref as a prop to the wrapped component
//     return <WrappedComponent {...this.props} ref={this.videoRef} />;
//   }
// };


function withVideoTimeTracker(WrappedComponent) {
  return VideoTimeTracker (WrappedComponent);
}

export default withVideoTimeTracker;